# Buddy - Your Personal Plant Care Assistant 🌱

**Buddy** is a mobile application designed to assist users in managing and caring for their plants. With Buddy, you can easily track your plants' watering schedules, log detailed care information, and maintain a journal of their growth—all in one place.

---

## Features ✨

### 1. **Garden Overview**

- Once logged in, users can view their **Garden**, a personalized list of plants they care for.
- Add plants to your garden with information fetched from our backend API.

### 2. **Plant Search**

- Search for plants using their **common name** or **Latin name**.
- Select a plant to add it to your garden for detailed care management.
- Search for plants with **image search**.

### 3. **Plant Management**

- Quickly mark plants as watered directly from the Garden screen.
- Navigate to a plant's dedicated page for:
  - Adding or editing a **nickname**.
  - Logging **journal entries** about plant growth and care.
  - Deleting a plant from your Garden.

### 4. **Watering Schedule**

- Access the **calendar** to view upcoming watering events for all your plants.
- Get a detailed breakdown of plants that need watering on specific dates.

---

## Tech Stack 🛠️

### **Backend**

- **MongoDB**
  - Chosen for its flexibility and ability to create nested structures, ideal for storing user gardens.
  - Enabled seamless sanitization and adaptation of plant data fetched from the Perenual plant library API.

### **Frontend**

- **React Native**
  - Facilitates modular and efficient development for a mobile-first experience.
  - Ensures a smooth, dynamic user interface for interacting with plant data.
- **Expo**
  - Simplifies visual debugging and enhances error handling during development.
  - Provides tools to ensure a consistent user experience across different navigation and interaction flows.

---

## Installation 🚀

1. **Clone the Repository**

```bash
	git clone https://github.com/natha7/buddy-app-frontend
	cd name-of-buddy-app-directory-here
```

2. **Install Dependencies**

```bash
	npm install
```

3. **Start the Application**

- Using Expo:

```bash
	expo start
```

Open the app on your mobile device using the Expo Go app or a simulator.

## Usage 🪴

### 1. **Log In or Create an Account**

- Access your personal garden.

### 2. **Search and Add Plants**

- Find plants by common or Latin names and add them to your garden.

### 3. **Track Care and Growth**

- Mark plants as watered or navigate to their pages for detailed journaling.

### 4. **Plan Your Watering**

- Use the calendar to manage your watering schedule effectively.

### 5. **Search for a Plant with a Photo**

- Use the Identify Bud tab to find the name of a plant when uploading a photo.

---

## License 📄

This project is licensed under the **MIT License**.

---

## Acknowledgments 🙌

- **Perenual Plant Library API** for providing extensive plant data.
- **Plant.id v3 | Kindwise** for providing the API to search for plants via a photo.
- **React Native Community** for tools and resources that simplified app development.
