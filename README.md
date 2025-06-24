# HubZero‑MERN 🌐⚙️

**The official MERN stack codebase for the Hub Zero website — a tech collective building software, electronics, and design solutions.**

---

## 🔗 Table of Contents

1. [About the Project](#about-the-project)  
2. [Tech Stack](#tech-stack)  
3. [Features](#features)  
4. [Deployment](#deployment)  
5. [Contributing](#contributing)  
6. [License](#license)

---

## 📝 About the Project

**HubZero‑MERN** is the dynamic full-stack codebase for [hubzero.in](https://hubzero.in), a portfolio and service website for the Hub Zero team — a collaboration between CSE and ECE engineers delivering innovative projects in web development, software, electronics, and creative design.

This platform includes:
- A public-facing website with info about the team, services, and projects
- A custom-built admin dashboard
- Blog management, portfolio pages, and more (coming soon)

The project is fully responsive, SEO-friendly, and designed to scale with advanced features like authentication, dynamic portfolios, and analytics.

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, GSAP (for animations)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT (with OTP or password support)  
- **Email:** Nodemailer (OTP delivery)  
- **Cloudinary:** Image hosting for team photos & uploads  
- **Deployment:** Ubuntu Server 24 LTS, NGINX, Cloudflare  
- **CI/CD:** Manual shell script deployment (`deploy.sh`)

---

## 🚀 Features

- 🧑‍💻 Dynamic team showcase with individual portfolio pages  
- 🛡️ Admin panel with role-based access (main & normal admins)  
- 📨 OTP-based + password-based login (JWT auth)  
- 🖼️ Cloud image uploads (e.g., team photos, certifications)  
- 🛠️ REST API for team data, portfolio content, and admin control  
- 📊 Future-ready structure for blog, analytics, and testimonials  
- 🎨 Clean, modern UI with smooth animations using GSAP + ScrollTrigger  
- 📱 Fully responsive and optimized for all devices

---

## 📦 Deployment

This project is deployed on a self-hosted **Ubuntu 24.04 LTS** server using:

- **NGINX** as reverse proxy for the React frontend and Node backend
- **Cloudflare** for domain, DNS, HTTPS, and security
- **PM2** for Node.js process management
- **Shell script:** `deploy.sh` handles frontend build & live deployment

> Future plans may include GitHub Actions for CI/CD.

---

## 🤝 Contributing

We welcome contributions from the open-source and developer community!

### How to Contribute

1. Fork this repository  
2. Create a new branch (`git checkout -b feature/your-feature`)  
3. Commit your changes (`git commit -m "Add new feature"`)  
4. Push to your branch (`git push origin feature/your-feature`)  
5. Open a Pull Request 🚀

---

## 📄 License

Licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for full details.

---

<p align="center">
  ⚡ Built by <strong>Hub Zero</strong> — Bridging Code & Creativity.
</p>
