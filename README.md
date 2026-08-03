# 📋 React Advanced Forms

<img width="1920" height="916" alt="image" src="https://github.com/user-attachments/assets/4e3f6075-fdfb-4254-9892-1957da66c2ee" />
<img width="1920" height="913" alt="image" src="https://github.com/user-attachments/assets/5aff57ae-2f07-41b2-98a3-c89ba620c00c" />
<img width="1920" height="910" alt="image" src="https://github.com/user-attachments/assets/1c821f94-0d04-4726-ae87-fcf684dccb78" />


🎮 [Live Application](https://react-advanced-forms.netlify.app/)

**React Advanced Forms** is a profile registration application showcasing two fundamentally different approaches to form handling in React: **Uncontrolled Components** and **React Hook Form**. Developed as a task for the **[RS School](https://rs.school/)** Frontend course, it demonstrates deep understanding of form state management, schema-based validation, accessible modal dialogs, and strict architectural principles.

This project goes beyond simple input fields; it features a complete design system with glassmorphism aesthetics, a **Feature-Sliced Design (FSD)** architecture, comprehensive **Zod** validation, image upload with Base64 conversion, and **93%+ test coverage**.

> 📋 **Task Description & Rules:**
> You can find the detailed technical requirements here: [RS School React Forms Task](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/forms.md)

-----

## 🏗️ Technical Architecture (Feature-Sliced Design)

The project strictly follows the **Feature-Sliced Design (FSD)** methodology, ensuring unidirectional layer dependencies and clean module isolation:

```
src/
├── app/          → Global setup: Redux Provider, store configuration, global styles & design tokens
├── pages/        → Page compositions: MainPage (assembles features + entities into a full view)
├── features/     → Interactive user scenarios: ControlledForm, UncontrolledForm
├── entities/     → Domain models: SubmissionCard (visual representation of a submission)
├── shared/       → Shared code: UI kit (8 components), Zod schemas, utility functions
└── widgets/      → Reserved for complex composite blocks (currently unused)
```

  * **Centralized Validation Factory:** A single `createFormSchema(validCountries)` function (powered by **Zod**) generates the same strict validation schema for both form implementations. Validation rules include: capitalized name, age ≥ 18, structural email checks (without regex), password strength, country existence check against the Redux store, and image type/size constraints.
  * **Redux Toolkit State Management:** The global store manages two slices: `submission` (CRUD for form entries with full history) and `country` (predefined list of valid countries used for autocomplete validation). Typed hooks (`useAppDispatch`, `useAppSelector`) ensure end-to-end type safety.
  * **Accessible Modal System:** A universal `<Modal>` component uses the native HTML `<dialog>` element combined with **React Portal** (`createPortal`). It implements full accessibility: focus trapping via `showModal()`, ESC key to close (native dialog behavior), click-outside-to-close via backdrop event delegation, and scroll-lock management.
  * **Glassmorphism Design System:** All UI primitives (`GlassCard`, `Button`, `Input`, `Select`, `Checkbox`, `FileInput`, `PasswordStrength`) share a cohesive frosted-glass aesthetic with CSS custom properties, `backdrop-filter`, and layered gradient borders. Typography is powered by **Inter** and **JetBrains Mono** fonts.
  * **Strict Code Quality Pipeline:** ESLint with type-checked rules, **Unicorn** plugin, and Prettier integration. Husky enforces `lint-staged` on pre-commit, `commitlint` (Conventional Commits) on commit-msg, and full test coverage suite on pre-push.

-----

## ✨ Key Features

### 📝 Dual Form Implementations

  * **Uncontrolled Form:** Reads values via `FormData` API on submit. No React state drives input values. Manual `safeParse()` validation with Zod. Error state managed as a flat `Record<string, string>`.
  * **React Hook Form (Controlled):** Uses `useForm` with `zodResolver` for live `onChange` validation. Submit button is dynamically disabled when the form is invalid. `useWatch` tracks the password field in real-time to feed the `PasswordStrength` indicator.

### 🔐 Comprehensive Validation (Zod)

  * **Name:** First letter must be uppercase.
  * **Age:** Must be an integer, ≥ 18, ≤ 150.
  * **Email:** Structural checks (exactly one `@`, non-empty local part, domain with at least one dot) — deliberately without regex.
  * **Password:** Must contain at least 1 number, 1 uppercase, 1 lowercase, and 1 special character. Confirm password must match.
  * **Country:** Must exist in the Redux-stored countries list (validated against the store).
  * **Image:** Only `.png`/`.jpeg`, max 5 MB, converted to Base64 via `FileReader.readAsDataURL`.
  * **Terms:** Must be accepted.

### 💾 State Management & Submission History

  * All successful submissions are stored in Redux (full history, not just the latest).
  * Submitted data is displayed as styled glassmorphism cards on the main page.
  * Newly submitted entries receive a **glowing animation** for 3 seconds to visually indicate the latest addition.
  * Individual submissions can be deleted.

### ✅ Accessible Modal

  * Built on the native `<dialog>` element with `showModal()` for proper focus trapping.
  * **ESC key** to close (native browser behavior).
  * **Click outside** (backdrop) to close.
  * Scroll-lock while modal is open.
  * Rendered via **React Portal** to `document.body`.

-----

## 🧪 Test Coverage

Comprehensive test suite covering all architectural layers:

| Metric       | Coverage |
|:-------------|:---------|
| Statements   | **93.37%** |
| Branches     | **81.33%** |
| Functions    | **94.82%** |
| Lines        | **95.39%** |

  * **Form components** — rendering, validation flows, submission logic for both controlled and uncontrolled forms.
  * **Modal component** — open/close lifecycle, portal rendering, accessibility (backdrop click, ESC).
  * **State management** — Redux slices (add, delete, clear submissions; country selectors).
  * **Utility functions** — password strength checker, file-to-Base64 converter.
  * **Validation schema** — all Zod refinements and edge cases.

-----

## 💻 Tech Stack

  * **Core:** React 19, TypeScript 6
  * **Forms:** React Hook Form 7, Zod 4
  * **State:** Redux Toolkit 2, React Redux 9
  * **Styling:** SCSS (CSS Modules), Glassmorphism UI design
  * **Build Tool:** Vite 8
  * **Testing:** Vitest 4, React Testing Library, V8 Coverage
  * **Linting:** ESLint 9 (TypeScript strict + Unicorn plugin), Prettier
  * **Git Flow:** Husky (pre-commit, commit-msg, pre-push), lint-staged, Commitlint

-----

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/FierceSloth/react-advanced-forms.git

# Navigate to the project
cd react-advanced-forms

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Available Scripts

| Script              | Description                               |
|:--------------------|:------------------------------------------|
| `npm run dev`       | Start Vite dev server with HMR            |
| `npm run build`     | Type-check and build for production       |
| `npm run preview`   | Preview production build locally          |
| `npm run lint`      | Run ESLint on source files                |
| `npm run lint:fix`  | Auto-fix ESLint issues                    |
| `npm run format`    | Format source files with Prettier         |
| `npm run test`      | Run Vitest in watch mode                  |
| `npm run test:coverage` | Run tests with V8 coverage report     |
| `npm run validate`  | Full pipeline: format + lint:fix + lint   |

