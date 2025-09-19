# 🚀 Personal Portfolio - Narisetti Chaitanya Naidu

A modern, responsive portfolio website showcasing my journey as an AI & Cybersecurity Explorer and Cloud-Native Innovator.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## 🌟 Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Dynamic Content**: Real-time GitHub repository fetching
- **Contact Form**: EmailJS integration for direct communication
- **Performance Optimized**: Fast loading with Next.js 14 and optimized assets
- **Accessibility**: WCAG compliant with proper semantic HTML

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email Service**: EmailJS
- **Deployment**: Vercel (recommended)

## 📋 Sections

- **Hero**: Introduction with animated elements
- **About**: Personal background and expertise
- **Skills**: Technical skills organized by category
- **Projects**: Featured projects with GitHub integration
- **Hackathons**: Competition participation and achievements
- **Certifications**: 35+ professional certifications
- **Internship**: Work experience at Edunet Foundation
- **Achievements**: NCC Cadet and Chess Player accomplishments
- **Contact**: Functional contact form with EmailJS

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ncn914491/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your EmailJS credentials:
   ```env
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 EmailJS Setup

For the contact form to work, you need to set up EmailJS:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Update your `.env.local` with the service and template IDs

See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) for detailed instructions.

## 🎨 Customization

### Colors
The portfolio uses a blue color scheme. To customize:
- Update Tailwind config in `tailwind.config.ts`
- Modify CSS variables in `app/globals.css`

### Content
- Update personal information in `app/page.tsx`
- Replace profile image in `public/profile.jpg`
- Modify project data in the projects section

### GitHub Integration
The portfolio automatically fetches your pinned repositories. Update the username in `app/page.tsx`:
```typescript
const username = "your-github-username";
```

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter
- `npm run type-check` - Run TypeScript checks

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
The portfolio can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **SEO**: Proper meta tags and semantic HTML
- **Accessibility**: WCAG 2.1 AA compliant

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: [chaitanyanaidunarisetti@gmail.com](mailto:chaitanyanaidunarisetti@gmail.com)
- **LinkedIn**: [narisetti-chaitanya-naidu](https://linkedin.com/in/narisetti-chaitanya-naidu)
- **GitHub**: [Ncn914491](https://github.com/Ncn914491)

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ by Narisetti Chaitanya Naidu