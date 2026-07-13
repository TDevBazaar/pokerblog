/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pokerblog.yoelv0022.workers.dev",
  generateRobotsTxt: true,
  outDir: "out",
};
