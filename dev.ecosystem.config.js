module.exports = {
  apps : [
    {
      script: 'index.js',
      watch: true,
      ignore_watch : ["node_modules", "cache", "logs", "*.log", "*.json", "*.tmp", ".idea", ".git", "src/apps/notes/node_modules"],
      watch_options: {
        followSymlinks: false,
        usePolling: true
      }
    }
  ]
};