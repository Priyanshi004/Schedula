# Prescription Feature Preview

## Overview
This preview shows how the prescription feature would look when implemented in the doctor dashboard, following the existing UI patterns and styling conventions.

## Prescription Dashboard Page

The prescription dashboard page would be accessible at `/dashboard/doctor/prescriptions` and would include:

1. **Header Section**
   - Page title: "Prescriptions"
   - "Add New Prescription" button with gradient styling

2. **Filtering and Grouping Controls**
   - Patient filter input field
   - Grouping dropdown with options:
     - Group by Patient
     - Group by Appointment

3. **Prescription List**
   - Prescriptions grouped by patient or appointment
   - Each prescription displayed in a card format with:
     - Medicine name as title
     - Dosage information
     - Duration
     - Patient name
     - Creation date
     - Notes section (if applicable)
     - Edit and Delete action buttons

4. **Empty State**
   - When no prescriptions exist, a friendly message with:
     - "No prescriptions found" heading
     - "Create your first prescription to get started" description
     - "Add New Prescription" button

## Prescription Form Modal

When adding or editing a prescription, a modal would appear with:

1. **Form Fields**
   - Medicine Name (text input)
   - Dosage (text input)
   - Duration (text input)
   - Notes/Instructions (textarea)

2. **Action Buttons**
   - Cancel button (secondary style)
   - Save Prescription button (primary gradient style)

## Integration with Doctor Sidebar

The "Prescriptions" option would be added to the doctor sidebar:
- Icon: Clipboard list icon (FaClipboardList)
- Label: "Prescriptions"
- Position: After "Inventory" and before "Communication"
- Active state styling with left border indicator

## UI Styling

The feature would follow the existing styling patterns:
- Gradient backgrounds (blue to sky blue)
- Glassmorphism effects with backdrop blur
- Rounded corners (typically rounded-2xl or rounded-3xl)
- Consistent shadow usage
- Responsive grid layouts
- Consistent spacing and padding
- Intuitive action buttons with hover effects

## Sample UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Doctor Dashboard - Prescriptions                           │
├─────────────────────────────────────────────────────────────┤
│  [←] Back | Prescriptions         [+] Add New Prescription  │
├─────────────────────────────────────────────────────────────┤
│  Filter: [Search by patient...]    Group by: [▼ Patient]   │
├─────────────────────────────────────────────────────────────┤
│  Patient: John Doe                                          │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Paracetamol                                      ✎ 🗑  │ │
│  │  Dosage: 500mg    Duration: 7 days    Patient: John Doe │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │ Notes: Take after meals                            │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │  Created: Aug 1, 2025                                   │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  Patient: Jane Smith                                        │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Amoxicillin                                      ✎ 🗑  │ │
│  │  Dosage: 250mg    Duration: 10 days   Patient: Jane S. │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │ Notes: Take with food                              │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │  Created: Aug 2, 2025                                   │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

This preview shows how the prescription feature would integrate seamlessly with the existing doctor dashboard UI while providing all the requested functionality.