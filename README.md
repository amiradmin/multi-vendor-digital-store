# Digital Marketplace

## Description
**Digital Marketplace** is a **multi-vendor e-commerce platform** built with Django, designed for selling **digital products** such as e-books, music, software, and more. The platform allows multiple vendors to register, list their digital products, and manage sales, while customers can browse, purchase, and download products instantly.

## Key Features
- **Multi-Vendor Support**: Vendors can create accounts and manage their digital products.
- **Secure Digital Downloads**: Customers receive a unique download link upon purchase.
- **Payment Integration**: Supports multiple payment gateways.
- **Order & Transaction Management**: Vendors can track sales and earnings.
- **User Authentication & Profiles**: Buyers and sellers can manage their profiles.
- **Admin Dashboard**: Superusers can oversee transactions and moderate content.
- **Product Search & Filters**: Customers can search and filter products by categories, tags, and other attributes.
- **Ratings & Reviews**: Customers can leave ratings and reviews for products.

## Tech Stack
- **Backend**: Django 4.x, Django Rest Framework (for APIs)
- **Frontend**: HTML, CSS, JavaScript (to be determined: React or plain HTML templates)
- **Database**: PostgreSQL (Recommended for production, SQLite for development)
- **Payment Gateway**: Stripe / PayPal (to be integrated)
- **Authentication**: Django’s built-in user authentication and custom profiles for vendors
- **Deployment**: Docker (with Docker Compose for multi-container setup)

## Installation & Setup

### Prerequisites
Before you start, make sure you have the following installed:
- **Python 3.8+**
- **Poetry** – Dependency management tool: [Install Poetry](https://python-poetry.org/docs/#installation)
- **Docker** – For containerization: [Install Docker](https://www.docker.com/get-started)

### 1. Clone the Repository
Clone the repository to your local machine:

```bash
git clone https://github.com/amiradmin/multi-vendor-digital-store.git
cd digital-marketplace
