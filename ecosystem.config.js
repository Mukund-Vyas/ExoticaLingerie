module.exports = {
    apps: [
      {
        name: "exotica-frontend-build", // Build process for frontend
        script: "npm",
        args: "run build", // Runs the build script
        cwd: "./exotica", // Working directory for the frontend
        env: {
          NODE_ENV: "production",
        },
        exec_mode: "fork",
        instances: 1,
        autorestart: false, // Only run the build once, no restart required
      },
      {
        name: "exotica-frontend", // Run process for frontend
        script: "npm",
        args: "run start", // Runs the start script (Next.js production server)
        cwd: "./exotica",
        watch: false,
        env: {
          NODE_ENV: "production",
          PORT: 3000,
        },
        exec_mode: "cluster",
        instances: "max", // Scales across all available CPUs
      },
      {
        name: "exotica-backend", // Backend Node.js app
        script: "npm",
        args: "run start",
        cwd: "./exotica_backend",
        watch: false,
        env: {
          NODE_ENV: "production",
          PORT: 5000,
        },
        exec_mode: "cluster",
        instances: "max",
      }
    ],
  };
  