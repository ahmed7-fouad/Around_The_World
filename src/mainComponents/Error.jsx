import FilterHdrIcon from "@mui/icons-material/FilterHdr";
export default function Error() {
  return (
    <>
      <section className="py-5 min-h-[calc(100vh-122px)] text-center dark:bg-darkBg">
        <FilterHdrIcon className="text-[25rem]! text-mainDark dark:text-main -mt-23"/>
        <h1 className="text-[13rem] font-semibold text-mainDark dark:text-main -mt-41">
          404
        </h1>
        <p className="font-semibold text-5xl -mt-11 text-mainDark dark:text-main">
          Error 404
        </p>
        <p className="capitalize text-xl font-medium text-mainDark dark:text-main mt-3">
          sorry for this error
        </p>
      </section>
    </>
  );
}
