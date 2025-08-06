# Prescription Feature Implementation Plan

## Prescription Data Structure

Based on the requirements, a prescription should include:

### Required Fields
- `id`: Unique identifier for the prescription
- `patientId`: Identifier for the patient
- `patientName`: Name of the patient
- `appointmentId`: Identifier for the related appointment
- `doctorId`: Identifier for the doctor
- `doctorName`: Name of the doctor
- `medicineName`: Name of the prescribed medicine
- `dosage`: Dosage information (e.g., "10mg", "2 tablets")
- `duration`: Duration of the prescription (e.g., "7 days", "2 weeks")
- `notes`: Additional instructions or notes
- `createdAt`: Timestamp when the prescription was created
- `updatedAt`: Timestamp when the prescription was last updated

### Optional Fields
- `status`: Status of the prescription (active, completed, expired)
- `frequency`: How often to take the medicine (e.g., "twice daily", "once daily")

## Mock Data File Structure

The prescription data will be stored in `data/prescriptions.json` similar to how appointments and inventory are stored.

Example data structure:
```json
[
  {
    "id": "pres-1",
    "patientId": "pat-1",
    "patientName": "John Doe",
    "appointmentId": "apt-1",
    "doctorId": "doc-1",
    "doctorName": "Dr. Smith",
    "medicineName": "Paracetamol",
    "dosage": "500mg",
    "duration": "7 days",
    "notes": "Take after meals",
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z",
    "status": "active"
  },
  {
    "id": "pres-2",
    "patientId": "pat-2",
    "patientName": "Jane Smith",
    "appointmentId": "apt-2",
    "doctorId": "doc-1",
    "doctorName": "Dr. Smith",
    "medicineName": "Amoxicillin",
    "dosage": "250mg",
    "duration": "10 days",
    "notes": "Take with food",
    "createdAt": "2025-08-02T14:30:00Z",
    "updatedAt": "2025-08-02T14:30:00Z",
    "status": "active"
  }
]
```

## API Routes

The prescription API routes will follow the same pattern as appointments:

### Directory Structure
```
app/
  api/
    prescriptions/
      route.ts          # GET, POST
      [id]/
        route.ts        # GET, PUT, DELETE
```

### Route Implementation Details

#### GET /api/prescriptions
- Read prescriptions from `data/prescriptions.json`
- Support query parameters for filtering:
  - `patientId`: Filter by patient ID
  - `doctorId`: Filter by doctor ID
  - `appointmentId`: Filter by appointment ID
- Return JSON array of prescriptions

Implementation Details:
```typescript
// GET /api/prescriptions
export async function GET(req: NextRequest) {
  try {
    // Read data from file
    const filePath = path.join(process.cwd(), 'data', 'prescriptions.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    let data: Prescription[] = JSON.parse(jsonData);

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get('patientId');
    const doctorId = searchParams.get('doctorId');
    const appointmentId = searchParams.get('appointmentId');

    // Apply filters if provided
    if (patientId) {
      data = data.filter(prescription => prescription.patientId === patientId);
    }
    
    if (doctorId) {
      data = data.filter(prescription => prescription.doctorId === doctorId);
    }
    
    if (appointmentId) {
      data = data.filter(prescription => prescription.appointmentId === appointmentId);
    }

    // Return filtered data
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading prescriptions:', error);
    return NextResponse.json(
      { error: 'Unable to load prescriptions' }, 
      { status: 500 }
    );
  }
}
```

#### GET /api/prescriptions/:id
- Read prescriptions from `data/prescriptions.json`
- Find prescription by ID
- Return 404 if not found
- Return JSON object of prescription

Implementation Details:
```typescript
// GET /api/prescriptions/[id]/route.ts
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    
    // Read data from file
    const filePath = path.join(process.cwd(), 'data', 'prescriptions.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data: Prescription[] = JSON.parse(jsonData);

    // Find prescription by ID
    const prescription = data.find(p => p.id === id);
    
    if (!prescription) {
      return NextResponse.json(
        { error: 'Prescription not found' }, 
        { status: 404 }
      );
    }

    // Return found prescription
    return NextResponse.json(prescription);
  } catch (error) {
    console.error('Error reading prescription:', error);
    return NextResponse.json(
      { error: 'Unable to load prescription' }, 
      { status: 500 }
    );
  }
}
```

#### POST /api/prescriptions
- Read existing prescriptions from `data/prescriptions.json`
- Validate required fields:
  - `patientId`
  - `patientName`
  - `doctorId`
  - `doctorName`
  - `medicineName`
  - `dosage`
  - `duration`
- Generate unique ID if not provided
- Set `createdAt` and `updatedAt` timestamps
- Add new prescription to array
- Write updated array to `data/prescriptions.json`
- Return created prescription with 201 status

Implementation Details:
```typescript
// POST /api/prescriptions
export async function POST(req: NextRequest) {
  try {
    // Read existing data
    const filePath = path.join(process.cwd(), 'data', 'prescriptions.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data: Prescription[] = JSON.parse(jsonData);

    // Parse request body
    const newPrescription: Prescription = await req.json();

    // Validate required fields
    if (!newPrescription.patientId || !newPrescription.patientName || 
        !newPrescription.doctorId || !newPrescription.doctorName ||
        !newPrescription.medicineName || !newPrescription.dosage || 
        !newPrescription.duration) {
      return NextResponse.json(
        { error: 'Missing required prescription fields' }, 
        { status: 400 }
      );
    }

    // Generate unique ID if not provided
    if (!newPrescription.id) {
      newPrescription.id = `pres-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    // Set timestamps
    const now = new Date().toISOString();
    newPrescription.createdAt = newPrescription.createdAt || now;
    newPrescription.updatedAt = now;

    // Add to data array
    data.push(newPrescription);

    // Write updated data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    // Return created prescription
    return NextResponse.json(newPrescription, { status: 201 });
  } catch (error) {
    console.error('Error saving prescription:', error);
    return NextResponse.json(
      { error: 'Unable to save prescription' }, 
      { status: 500 }
    );
  }
}
```

#### PUT /api/prescriptions/:id
- Read existing prescriptions from `data/prescriptions.json`
- Find prescription by ID
- Return 404 if not found
- Update provided fields
- Update `updatedAt` timestamp
- Write updated array to `data/prescriptions.json`
- Return updated prescription

Implementation Details:
```typescript
// PUT /api/prescriptions/[id]/route.ts
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    
    // Read existing data
    const filePath = path.join(process.cwd(), 'data', 'prescriptions.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data: Prescription[] = JSON.parse(jsonData);

    // Find prescription by ID
    const index = data.findIndex(p => p.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Prescription not found' }, 
        { status: 404 }
      );
    }

    // Parse request body
    const updatedPrescription: Partial<Prescription> = await req.json();

    // Update only provided fields (partial update)
    const prescription = { ...data[index], ...updatedPrescription };
    
    // Update timestamp
    prescription.updatedAt = new Date().toISOString();
    
    // Update in array
    data[index] = prescription;

    // Write updated data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    // Return updated prescription
    return NextResponse.json(prescription);
  } catch (error) {
    console.error('Error updating prescription:', error);
    return NextResponse.json(
      { error: 'Unable to update prescription' }, 
      { status: 500 }
    );
  }
}
```

#### DELETE /api/prescriptions/:id
- Read existing prescriptions from `data/prescriptions.json`
- Find prescription by ID
- Return 404 if not found
- Remove prescription from array
- Write updated array to `data/prescriptions.json`
- Return success response

Implementation Details:
```typescript
// DELETE /api/prescriptions/[id]/route.ts
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    
    // Read existing data
    const filePath = path.join(process.cwd(), 'data', 'prescriptions.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data: Prescription[] = JSON.parse(jsonData);

    // Find prescription by ID
    const index = data.findIndex(p => p.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Prescription not found' }, 
        { status: 404 }
      );
    }

    // Remove from array
    data.splice(index, 1);

    // Write updated data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting prescription:', error);
    return NextResponse.json(
      { error: 'Unable to delete prescription' }, 
      { status: 500 }
    );
  }
}
```

### Error Handling
- File read/write errors: Return 500 with error message
- Validation errors: Return 400 with error details
- Not found errors: Return 404 with error message
- General errors: Return 500 with error message

## UI Components

### Prescription Form Component
Path: `components/PrescriptionForm.tsx`

Props:
- `prescription`: Optional prescription object for editing
- `onSave`: Function to handle save action
- `onCancel`: Function to handle cancel action
- `isLoading`: Boolean to indicate if form is in loading state

Fields:
- Medicine Name (text input)
- Dosage (text input)
- Duration (text input)
- Notes/Instructions (textarea)

Form Actions:
- Save (creates new or updates existing)
- Cancel

Form Validation:
- Medicine Name is required
- Dosage is required
- Duration is required

Implementation Details:
- Use React Hook Form for form management
- Use existing UI components (Input, Button) where possible
- Follow existing styling patterns
- Include loading states during API calls
- Handle form submission errors
- Reset form after successful submission

Form Structure:
```tsx
<form onSubmit={handleSubmit}>
  <Input 
    label="Medicine Name"
    name="medicineName"
    value={formData.medicineName}
    onChange={handleInputChange}
    required
  />
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Input 
      label="Dosage"
      name="dosage"
      value={formData.dosage}
      onChange={handleInputChange}
      required
    />
    
    <Input 
      label="Duration"
      name="duration"
      value={formData.duration}
      onChange={handleInputChange}
      required
    />
  </div>
  
  <textarea
    label="Notes/Instructions"
    name="notes"
    value={formData.notes}
    onChange={handleInputChange}
    rows={4}
  />
  
  <div className="flex gap-4 mt-6">
    <Button type="button" variant="secondary" onClick={onCancel}>
      Cancel
    </Button>
    <Button type="submit" loading={isLoading}>
      Save Prescription
    </Button>
  </div>
</form>
```

### Prescription List Component
Path: `components/PrescriptionList.tsx`

Props:
- `prescriptions`: Array of prescription objects
- `onEdit`: Function to handle edit action
- `onDelete`: Function to handle delete action
- `grouping`: String indicating grouping method ("patient" or "appointment")

State Management:
- Grouped prescriptions based on grouping method
- Loading state for any async operations
- Error state for handling errors

Display:
- Medicine Name
- Dosage
- Duration
- Notes
- Patient Name
- Created Date

Grouping Implementation:
- When grouping by "patient":
  - Create groups with patient name as key
  - Display patient name as group header
  - List prescriptions under each patient
- When grouping by "appointment":
  - Create groups with appointment ID as key
  - Display appointment date as group header
  - List prescriptions under each appointment

Actions:
- Edit (opens form with existing data)
- Delete (with confirmation)

Implementation Details:
- Group prescriptions by patient or appointment
- Display each prescription using PrescriptionCard component
- Include group headers with patient/appointment information
- Follow existing styling patterns
- Handle empty state when no prescriptions exist

List Structure:
```tsx
<div className="space-y-8">
  {Object.entries(groupedPrescriptions).map(([groupKey, prescriptions]) => (
    <div key={groupKey} className="space-y