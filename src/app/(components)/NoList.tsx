const NoList = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${className}`}
    >
      <p className="text-center text-lg font-medium text-[#0D062D]">No data</p>
    </div>
  );
};

export default NoList;
