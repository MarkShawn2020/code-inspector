/**
 * Design Tokens - Claude Design System Integration
 *
 * Based on Anthropic Claude design guide:
 * - Warm, professional, trustworthy aesthetic
 * - Soft backgrounds, serif headings, ample whitespace
 * - Maintains Code Inspector's functional requirements
 */
export declare const DesignTokens: {
    /**
     * Color System
     * Integrates Claude's soft palette while preserving mode distinction
     */
    readonly colors: {
        readonly primary: "#D97757";
        readonly background: {
            readonly main: "#F9F9F7";
            readonly ivory: "#F0EEE6";
            readonly dark: "#141413";
            readonly oat: "#F7F4EC";
            readonly overlay: "rgba(249, 250, 251, 0.95)";
        };
        readonly text: {
            readonly main: "#181818";
            readonly faded: "#87867F";
            readonly white: "#FFFFFF";
        };
        readonly mode: {
            readonly copy: {
                readonly base: "#B49FD8";
                readonly light: "rgba(180, 159, 216, 0.15)";
                readonly accent: "#9B7EC9";
            };
            readonly locate: {
                readonly base: "#629A90";
                readonly light: "rgba(98, 154, 144, 0.15)";
                readonly accent: "#4F8078";
            };
            readonly target: {
                readonly base: "#97B5D5";
                readonly light: "rgba(151, 181, 213, 0.15)";
                readonly accent: "#7A9BC4";
            };
        };
        readonly border: {
            readonly subtle: "rgba(0, 0, 0, 0.05)";
            readonly default: "#E8E6DC";
            readonly medium: "rgba(0, 0, 0, 0.08)";
        };
        readonly accent: {
            readonly hotkey: "#00B42A";
            readonly success: "#629A90";
            readonly info: "#97B5D5";
        };
        readonly swatch: {
            readonly slate: {
                readonly light: "#87867F";
            };
            readonly cloud: {
                readonly light: "#E8E6DC";
            };
            readonly fig: "#B49FD8";
            readonly olive: "#C2C07D";
            readonly cactus: "#629A90";
            readonly sky: "#97B5D5";
            readonly heather: "#D2BEDF";
        };
    };
    /**
     * Border Radius
     * Claude design system standard values
     */
    readonly borderRadius: {
        readonly sm: "0.375rem";
        readonly md: "0.75rem";
        readonly lg: "1.5rem";
        readonly full: "9999px";
    };
    /**
     * Shadows
     * Softer shadows aligned with Claude's gentle aesthetic
     */
    readonly shadows: {
        readonly popper: "0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.04)";
        readonly card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)";
        readonly original: "0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)";
    };
    /**
     * Spacing
     * Balanced spacing system (slightly more compact than Claude for dev tool density)
     */
    readonly spacing: {
        readonly xs: "0.25rem";
        readonly s: "0.5rem";
        readonly m: "1rem";
        readonly l: "1.5rem";
        readonly xl: "2rem";
        readonly xxl: "3rem";
    };
    /**
     * Typography
     * Font weights aligned with Claude's system
     */
    readonly fontWeight: {
        readonly regular: 400;
        readonly medium: 500;
        readonly semibold: 600;
        readonly bold: 700;
    };
    /**
     * Transitions
     * Smooth transitions for interactions
     */
    readonly transitions: {
        readonly fast: "0.15s ease-in-out";
        readonly normal: "0.2s ease-in-out";
        readonly slow: "0.3s ease-in-out";
    };
};
/**
 * Helper type for mode colors
 */
export type ModeColorSet = {
    badge: string;
    badgeText: string;
    accent: string;
    overlay: string;
};
/**
 * Get mode-specific color set
 */
export declare function getModeColors(mode: 'copy' | 'locate' | 'target'): ModeColorSet;
