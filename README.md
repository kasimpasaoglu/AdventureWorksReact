<h1 align="center">Demo E-Commerce Project</h1>
<p align="center">
  <img src="./public/adventureworksstore.gif" alt="Project Banner" width="600"/>
</p>

This project is a **React, Vite, and TypeScript** based e-commerce application built using the **[AdventureWorks API](https://github.com/kasimpasaoglu/AdventureWorksAPI)** of my own build.

:warning: **This project uses a free hosting platform, which may result in lower performance. To test the API performance,** [use this](http://adventureworksapi.runasp.net/swagger/index.html)
**Due to the HTTP protocol provided by MonsterASP, I cannot use this API link on Netlify.** :warning:

## 🚀 Features

- **Product Listing & Filtering**: Filter products by category, subcategory, price range, and colors.
- **User Authentication**: Users can register, log in, and log out.
- **Cart Management**: Users can add products to the cart, remove them, and proceed to checkout.
- **Pages Included:**
  - 🏠 **Home**
  - 🏬 **Shop**
  - ℹ️ **About**
  - 🔐 **Login & Register**
  - 🛒 **Cart**
  - 👤 **Account**
  - 🔍 **Product Detail Page**

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **State Management:** Context API
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Backend API:** AdventureWorks API

---

## 📌 Installation & Setup

Follow these steps to set up the project locally.

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/project-name.git
cd project-name
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Start the Development Server

```sh
npm run dev
```

---

## 📢 Development Notes

- **Context API Usage:** `ShopContext`, `AuthContext` and `CartContext` are used to manage application states.
- **API Integration:** API calls are handled through `infrastructure/`.

---

## 🤝 Contributing

Want to contribute? Follow these steps:

1. **Fork** the repository
2. Create a new **branch** (`feature/new-feature`)
3. **Commit** your changes
4. Open a **Pull Request** 🎉
