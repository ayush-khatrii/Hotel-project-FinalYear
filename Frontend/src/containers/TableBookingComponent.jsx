const TableBookingComponent = () => {
    const tables = [
      { id: 1, name: 'Table 1', available: true },
      { id: 2, name: 'Table 2', available: false },
      { id: 3, name: 'Table 3', available: true },
      { id: 4, name: 'Table 4', available: true },
      // Add more table data as needed
    ];
  
    const handleTableClick = (tableId) => {
      // Handle table click logic here
      console.log(`Table ${tableId} clicked`);
      // Perform table booking logic or navigate to booking page
    };
  
    return (
      <div className="py-8 px-4">
        <h2 className="text-2xl font-bold mb-4">Table Booking</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tables.map((table) => (
            <div
              key={table.id}
              onClick={() => handleTableClick(table.id)}
              className={`p-4 border rounded-md cursor-pointer ${
                table.available ? 'bg-green-200' : 'bg-red-200'
              } hover:bg-blue-200 transition duration-300`}
            >
              <p className="text-lg font-semibold">{table.name}</p>
              <p>{table.available ? 'Available' : 'Occupied'}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TableBookingComponent;