# Frontend Take-Home Assignment

Welcome to our frontend take-home assignment! This project is a React application with GraphQL integration that displays user data in a table format.

## Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Make sure the backend API is running at `http://localhost:8000`**

   - The GraphQL playground should be accessible at `http://localhost:8000/graphql`
   - If the backend isn't running, the frontend will show connection errors

4. **Generate GraphQL types (run this after any query changes):**
   ```bash
   npm run codegen
   ```

## Your Tasks

### Required Tasks

1. **Complete the GenericCell component** (`src/components/table/cells/GenericCell.tsx`)

   - This component should handle rendering different data types appropriately

2. **Hook up the search functionality**

   - The search input in `TableFilters` component is already created but not connected
   - You'll need to wire it to the GraphQL query in the `Table` component (`src/components/table/Table.tsx`)
   - Look at the existing `getUsers` query (`src/gql/getUsers.ts`) for reference on GraphQL structure

3. **Implement Posts Column with Hover Details**

   - Add a "Posts" column to the table that displays the number of posts each user has
   - We should be able to see relevant post content on hover; what that is, is up to you.
   - Create a hover component that shows post titles and content when hovering over the posts count
   - You'll need to query posts data using the available GraphQL endpoints

4. **Implement LoadingSpinner component**
   - `src/components/LoadingSpinner.tsx` - Show loading state with appropriate styling
   - Replace the simple "Loading users..." text in the Table component

### Development Tips

1. **API Documentation**: Visit `http://localhost:8000/graphql` to explore the GraphQL schema and available queries
2. **After modifying GraphQL queries**: Always run `npm run codegen` to regenerate TypeScript types

### Key Files to Examine

- `src/components/table/Table.tsx` - Main table component with GraphQL integration
- `src/components/table/TableFilters.tsx` - Search input component (needs wiring)
- `src/gql/getUsers.ts` - Example GraphQL query structure
- `src/__generated__/graphql.ts` - Generated TypeScript types from GraphQL schema
- `codegen.ts` - GraphQL code generation configuration

### Technical Notes

- The project uses Apollo Client for GraphQL integration
- TypeScript is configured with strict type checking
- Tailwind CSS is available for styling
- The table component uses TanStack Table (React Table v8)

### GraphQL Schema Reference

The API provides `users` and `posts` queries with comprehensive filtering options. You can explore the full schema, available fields, and filter types by visiting the GraphQL playground at `http://localhost:8000/graphql`.

### Evaluation Criteria

- Code quality and organization
- TypeScript usage and type safety
- Component reusability and design patterns
- GraphQL integration
- User experience and interface design

## Available Scripts

- `npm run dev` - Start development server
- `npm run codegen` - Generate GraphQL types and hooks
- `npm run lint` - Run ESLint

Good luck! Feel free to make improvements beyond the required tasks if you see opportunities.
