// CreateEvent.tsx

export const CreateEvent: React.FC = () => {
  const {
    createEvent: { mutation: createEvent, data, isLoading },
  } = useEventApi();

  const createForm = useForm();

  const handleSubmit = async () => {
    const values = createForm.getValues();

    // TypeScript will tell us if our input object is wrong!
    await createEvent({
      title: values.title,
      description: values.description,
      startDate: values.startDate,
    });
  };

  return data === null ? (
    <form>
      <input {...createForm.register("title")} />
      <input {...createForm.register("description")} />
      <input {...createForm.register("startDate")} />
      <button onClick={handleSubmit}>Submit</button>
    </form>
  ) : (
    // TypeScript will tell us what attributes are on the data object!
    <div>Successfully created supplier {data.name}</div>
  );
};
