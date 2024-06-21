import { Helmet } from "react-helmet-async";

import { SizeView } from "src/sections/size/view";

// ----------------------------------------------------------------------

export default function SizePage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <SizeView />
    </>
  );
}
