# Lucidity

Lucidity is a web application built using Vite, React with TypeScript, and Redux. It serves as a management tool for inventory, allowing users to view, add, edit, and delete products. The project is structured with separate components for widgets and the product table, and it utilizes global state management with Redux to handle inventory data.

## Installation

To get started with Lucidity, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install all dependencies.
4. Start the development server by running `npm run dev`.

## Project Structure

- **Root File**: `main.tsx`
- **Root Component**: `App.tsx`
- **Components**:
  - Widgets Section
  - Product Table Section
  - Edit Modal/Popup (Separate Component)

## Global State (Inventory)

The application utilizes Redux to manage a global state called `inventory`. This state stores the product data fetched from an API, as well as additional metrics such as total items, total value, out of stock count, and category count. CRUD operations on products trigger updates to these metrics.

## Components

### Widgets Section

The widgets section displays various metrics related to the inventory, such as total items, total value, out of stock count, and category count.

### Product Table Section

The product table section presents a tabular view of the inventory, allowing users to perform CRUD operations on individual products.

### Edit Modal/Popup

The edit modal or popup component provides a form for editing product details. It is invoked with local product data and updates the global state upon submission.
