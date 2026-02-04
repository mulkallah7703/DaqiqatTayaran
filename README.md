# Aviation AI Platform

A premium, AI-powered aviation platform with three integrated sections: Company Profile, AvTech Solutions, and Digital Academy (LMS).

## Features

### 🏢 Company Profile Section
- Corporate introduction and overview
- Vision, Mission, and Strategic Enablers
- Key metrics and growth performance
- Team members and leadership
- Client and partner showcases
- Modular, admin-editable content

### 🤖 AvTech Solutions Section
- AI-powered aviation tools and solutions
- Technology showcases and use cases
- Prompt engineering for productivity
- Innovation-focused content
- Future-ready digital solutions

### 🎓 Digital Academy Section
- Comprehensive Learning Management System (LMS)
- Course creation and management
- User enrollment and progress tracking
- White-label ready architecture
- Scalable and modular design

### 🎯 Core Features
- **AI Assistant**: Built-in AI helper across the platform
- **Admin Dashboard**: Complete content management system
- **Responsive Design**: Works on all devices
- **Dark Theme**: Premium, minimalist UI
- **Saudi Vision 2030 Aligned**: Innovation and digital transformation focus

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** authentication
- **OpenAI API** integration
- **Security**: Helmet, CORS, Rate limiting

### Frontend
- **React 18** with hooks
- **Material-UI (MUI)** for components
- **Framer Motion** for animations
- **React Router** for navigation
- **Axios** for API calls
- **React Query** for data management

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- OpenAI API key (optional, for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aviation-ai-platform
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   Copy `.env` and update the values:
   ```bash
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/aviation-platform
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   CLIENT_URL=http://localhost:3000
   OPENAI_API_KEY=your-openai-api-key-here
   
   # Admin credentials
   ADMIN_EMAIL=admin@aviationplatform.com
   ADMIN_PASSWORD=AdminPass123!
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running locally or update `MONGODB_URI` with your cloud connection string.

5. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

6. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and React frontend (port 3000).

### Alternative: Start servers separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## Project Structure

```
aviation-ai-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   └── ...
├── models/                 # MongoDB models
├── routes/                 # Express API routes
├── middleware/             # Custom middleware
├── seed.js                 # Database seeding script
├── server.js               # Express server
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Content Management
- `GET /api/content/:section` - Get section content
- `POST /api/content` - Create content (admin)
- `PUT /api/content/:id` - Update content (admin)
- `DELETE /api/content/:id` - Delete content (admin)

### Courses (LMS)
- `GET /api/courses` - Get all courses
- `GET /api/courses/featured` - Get featured courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in course
- `POST /api/courses` - Create course (admin)

### AI Assistant
- `POST /api/ai/chat` - Chat with AI assistant
- `POST /api/ai/suggest` - Get AI content suggestions

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/content` - Manage all content
- `POST /api/admin/bulk-action` - Bulk operations

## Default Admin Account

After running the seed script:
- **Email**: admin@aviationplatform.com
- **Password**: AdminPass123!

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use a secure `JWT_SECRET`
- Configure production MongoDB URI
- Set up proper CORS origins
- Add your OpenAI API key

## Features in Detail

### AI Assistant
- Context-aware responses
- Platform navigation help
- Aviation knowledge base
- Course recommendations
- Available across all sections

### Admin Dashboard
- Complete content management
- User management and roles
- Course creation and editing
- Analytics and reporting
- Bulk operations
- No-code content updates

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Consistent experience across devices
- Touch-friendly interactions

### Security
- JWT-based authentication
- Role-based access control
- Rate limiting
- Input validation
- CORS protection
- Helmet security headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: info@aviationplatform.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

---

**Built with ❤️ for Saudi Vision 2030**