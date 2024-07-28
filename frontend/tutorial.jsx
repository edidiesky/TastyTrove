const DashboardSidebar = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const pathname = true;
  return (
    <div
      className={`w-full flex column gap-2`}
    >

    </div>
  );
};


const DashboardLayout= () => {
  const { currentUser } = useSelector((store) => store.auth);
  const pathname = true;
  return <div className="w-full">
    {/* sidebar section */}
    {/* main outlet */}
  </div>;
};
