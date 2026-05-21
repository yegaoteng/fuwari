import type {
	AntiLeechConfig,
	ExpressiveCodeConfig,
	ImageFallbackConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
	UmamiConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "ye & 帆蓝的小博客",
	subtitle: "",
	description:
		"",
	url:"https://blog.ffurry.cc.cd",

	keywords: [],
	lang: "zh_CN", // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
	themeColor: {
		hue: 361, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: true, // Hide the theme color picker for visitors
		forceDarkMode: true, // Force dark mode and hide theme switcher
	},
	banner: {
		enable: false,
		src: "/xinghui.avif", // Relative to the /src directory. Relative to the /public directory if it starts with '/'

		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: true, // Display the credit text of the banner image
			text: "Pixiv @chokei", // Credit text to be displayed

			url: "https://links.8uid.com/d/67ef7d9ad8aaf67b96a717c6967e22d3", // (Optional) URL link to the original artwork or artist's page
		},
	},
	background: {
		enable: true, // Enable background image
		src: "https://app.webwd.de5.net/2.jpg", // 优先使用新 API
		position: "center", // Background position: 'top', 'center', 'bottom'
		size: "cover", // Background size: 'cover', 'contain', 'auto'
		repeat: "no-repeat", // Background repeat: 'no-repeat', 'repeat', 'repeat-x', 'repeat-y'
		attachment: "fixed", // Background attachment: 'fixed', 'scroll', 'local'
		opacity: 0.5, // Background opacity (0-1)
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		{
			src: "https://app.webwd.de5.net/2.jpg", // Path of the favicon, relative to the /public directory
			//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
			//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		},
	],
	apps: [
		{
			name: "YETVPLUS",
			url: "https://mtv.ffurry.cc.cd",
			image: "/favicon/openwebui.webp",
			description: "一个免费看动漫的软件",
			external: true,
		},
		
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Friends,
		LinkPreset.Apps,
		LinkPreset.Donate,
		LinkPreset.Stats,
		LinkPreset.Status,
		LinkPreset.Monitor,
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "http://webcd.xo.je/view.php/301df8bf2c30d0a0de67e18e76c5bf69.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "帆蓝",
	bio: ["邮箱:y@webwd.de5.net"],
	links: [
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

//图片回退
export const imageFallbackConfig: ImageFallbackConfig = {
	enable: true,
	originalDomain: "img.micostar.cc", // 主力图床 (新项目)
	fallbackDomain: "image.cloudrunmax.top", // R2 备用图床 (旧项目)
};

export const umamiConfig: UmamiConfig = {
	enable: true,
	baseUrl: "https://umami.ffurry.cc.cd",
	shareId: "6c8c12b4-d6fd-4240-8f61-f2da0b3d6a12",
	timezone: "Asia/Shanghai",
};

// 防盗链/域名保护配置
export const antiLeechConfig: AntiLeechConfig = {
	enable: true,
	officialSites: [{ url: "https://blog.ffurry.cc.cd", name: "主站" }],
	debug: false,
	warningTitle: "⚠️ 域名安全警告",
	warningMessage:
		"您可能正在访问非官方网站，存在安全风险！建议跳转到官方网站。",
};

export const googleAnalyticsConfig = {
	enable: true,
	measurementId: "G-68S9RLWRP0",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};
