// @vitest-environment jsdom

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LovinspComponent } from '@/core/src/client';
import { PathName } from '@/core/src/shared';

describe('LovinspComponent - renderCover method', () => {
  let component: LovinspComponent;
  let targetElement: HTMLElement;
  const originalGetComputedStyle = window.getComputedStyle;
  const originalClientHeight = Object.getOwnPropertyDescriptor(
    document.documentElement,
    'clientHeight'
  );
  const originalClientWidth = Object.getOwnPropertyDescriptor(
    document.documentElement,
    'clientWidth'
  );

  beforeEach(async () => {
    component = new LovinspComponent();
    document.body.appendChild(component);
    await component.updateComplete;
    component.elementInfoRef.getBoundingClientRect = vi.fn().mockReturnValue({
      width: 300,
      height: 40,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    } as DOMRect);
    
    // 模拟目标元素
    targetElement = document.createElement('div');
    document.body.appendChild(targetElement);
    
    // 模拟 getBoundingClientRect
    targetElement.getBoundingClientRect = vi.fn().mockReturnValue({
      top: 100,
      right: 200,
      bottom: 150,
      left: 50,
      width: 150,
      height: 50
    });

    // 模拟 getComputedStyle
    window.getComputedStyle = vi.fn().mockReturnValue({
      userSelect: 'text',
      getPropertyValue: vi.fn().mockReturnValue('10')
    });

    // 模拟 document.documentElement 尺寸
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 800,
      configurable: true
    });
    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: 1200,
      configurable: true
    });

    // 模拟 getDomPropertyValue 方法
    component.getDomPropertyValue = vi.fn().mockReturnValue(10);
    
    // 模拟 addGlobalCursorStyle 方法
    component.addGlobalCursorStyle = vi.fn();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    window.getComputedStyle = originalGetComputedStyle;
    if (originalClientHeight) {
      Object.defineProperty(document.documentElement, 'clientHeight', originalClientHeight);
    }
    if (originalClientWidth) {
      Object.defineProperty(document.documentElement, 'clientWidth', originalClientWidth);
    }
    vi.restoreAllMocks();
  });

  describe('Position Calculation', () => {
    it('should calculate and set position correctly', async () => {
      await component.renderCover(targetElement);

      expect(component.position).toEqual({
        top: 100,
        right: 200,
        bottom: 150,
        left: 50,
        border: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        },
        padding: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        },
        margin: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        }
      });
    });

    it('should calculate info class names correctly', async () => {
      await component.renderCover(targetElement);

      expect(component.elementTipStyle.vertical).toBe('element-info-bottom');
      expect(component.elementTipStyle.horizon).toBe('element-info-right');
    });

    it('should capture element size correctly', async () => {
      await component.renderCover(targetElement);

      expect(component.element.width).toBe(150);
      expect(component.element.height).toBe(50);
    });
  });

  describe('Element Information', () => {
    it('should parse path attribute correctly', async () => {
      targetElement.setAttribute(PathName, '/path/to/file.ts:10:5:div');
      
      await component.renderCover(targetElement);

      expect(component.element).toEqual({
        name: 'div',
        path: '/path/to/file.ts',
        line: 10,
        column: 5,
        width: 150,
        height: 50
      });
    });

    it('should handle Astro source information', async () => {
      targetElement.setAttribute('data-astro-source-file', '/astro/file.ts');
      targetElement.setAttribute('data-astro-source-loc', '15:10');
      
      await component.renderCover(targetElement);

      expect(component.element).toEqual({
        name: targetElement.tagName.toLowerCase(),
        path: '/astro/file.ts',
        line: 15,
        column: 10,
        width: 150,
        height: 50
      });
    });

    it('should handle missing path information', async () => {
      await component.renderCover(targetElement);

      expect(component.element).toEqual({
        name: 'div',
        path: '',
        line: NaN,
        column: NaN,
        width: 150,
        height: 50
      });
    });
  });

  describe('Style Handling', () => {
    it('should store and set userSelect style', async () => {
      await component.renderCover(targetElement);

      expect(component.preUserSelect).toBe('text');
      expect(document.body.style.userSelect).toBe('none');
    });

    it('should not override existing preUserSelect', async () => {
      component.preUserSelect = 'existing';
      await component.renderCover(targetElement);

      expect(component.preUserSelect).toBe('existing');
    });

    it('should call addGlobalCursorStyle', async () => {
      await component.renderCover(targetElement);

      expect(component.addGlobalCursorStyle).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero dimensions', async () => {
      targetElement.getBoundingClientRect = vi.fn().mockReturnValue({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 0,
        height: 0
      });

      await component.renderCover(targetElement);

      expect(component.element.width).toBe(0);
      expect(component.element.height).toBe(0);
    });

    it('should handle negative positions', async () => {
      targetElement.getBoundingClientRect = vi.fn().mockReturnValue({
        top: -100,
        right: 200,
        bottom: -50,
        left: -50,
        width: 250,
        height: 50
      });

      await component.renderCover(targetElement);

      expect(component.position.top).toBe(-100);
      expect(component.position.left).toBe(-50);
    });

    it('should handle malformed path string', async () => {
      targetElement.setAttribute(PathName, 'invalid:path:string');
      
      await component.renderCover(targetElement);

      expect(component.element.path).toBe('');
      expect(component.element.line).toBe(NaN);
      expect(component.element.width).toBe(150);
      expect(component.element.height).toBe(50);
    });
  });

  describe('Viewport Calculations', () => {
    it('should handle element near viewport edges', async () => {
      // 模拟元素靠近视口边缘
      targetElement.getBoundingClientRect = vi.fn().mockReturnValue({
        top: 50,
        right: 1150,
        bottom: 750,
        left: 50
      });

      await component.renderCover(targetElement);

      expect(component.elementTipStyle.vertical).toBe('element-info-bottom');
      expect(component.elementTipStyle.horizon).toBe('element-info-right');
    });

    it('should handle element near viewport edges', async () => {
      // 模拟元素靠近视口边缘
      targetElement.getBoundingClientRect = vi.fn().mockReturnValue({
        top: 3000,
        right: 1150,
        bottom: 0,
        height: 20,
        left: 50
      });

      await component.renderCover(targetElement);

      expect(component.elementTipStyle.vertical).toBe('element-info-bottom');
      expect(component.elementTipStyle.horizon).toBe('element-info-right');
    });

    it('should handle element near viewport edges top', async () => {
      // 模拟元素靠近视口边缘
      targetElement.getBoundingClientRect = vi.fn().mockReturnValue({
        top: 1000,
        right: 1150,
        bottom: 10,
        height: 20,
        left: 50
      });
      component.getDomPropertyValue = vi.fn().mockReturnValue(990);
      await component.renderCover(targetElement);

      expect(component.elementTipStyle.vertical).toBe('element-info-bottom');
      expect(component.elementTipStyle.horizon).toBe('element-info-right');
    });

    it('should handle element larger than viewport', async () => {
      targetElement.getBoundingClientRect = vi.fn().mockReturnValue({
        top: -100,
        right: 1300,
        bottom: 900,
        left: -50
      });

      await component.renderCover(targetElement);

      // 验证宽度计算
      expect(component.element.width).toBeGreaterThan(300);
    });
  });
});
