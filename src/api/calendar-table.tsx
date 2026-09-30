export const EventsTableView: React.FC = () => {

  const {
    getEvents: {
      query,
      data,
      loading
    }
  } = useEventApi()

  useEffect(() => {
    query()
  }, [query])

  const events = data.items;

  return loading ? <Loader /> : <EventsTable events={events} />
}
