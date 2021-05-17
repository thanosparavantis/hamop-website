import {Helmet} from "react-helmet";

function PageSettings({title}) {
  return (
    <Helmet>
      <body className="font-hamop bg-gradient-to-r from-gray-100 to-gray-200"/>

      { title && (
        <title>{title} - hamop.gr</title>
      )}
    </Helmet>
  )
}

export default PageSettings