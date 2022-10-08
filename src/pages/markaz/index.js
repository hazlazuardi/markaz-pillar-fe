import { useState } from "react";
import { axiosMain } from "../../axiosInstances";
import useSWR from "swr";

import AdminOrUserTemplate from "../../component/templates/admin/AdminOrUserTemplate";

import GridView from "../../component/templates/admin/GridView";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Markaz(props) {
	const { allMarkaz } = props;
	const [searchMarkaz, setSearchMarkaz] = useState("")
	const [page, setPage] = useState(1);
	const [entries, setEntries] = useState(10);
	const [locationFilter, setLocationFilter] = useState("");
	const [nameFilter, setNameFilter] = useState("ASC");
	const [categoryFilter, setCategoryFilter] = useState();
	const [categoryFilter2, setCategoryFilter2] = useState();
	const [categoryFilter3, setCategoryFilter3] = useState();

	//   const {
	//     data: responseMarkaz,
	//     error,
	//     mutate,
	//   } = useSWR(
	//     `/markaz/search?page=${page - 1}&n=${entries}&${!!locationFilter ? "address=" + locationFilter : ""
	//     }&${!!nameFilter ? "sortedName=" + nameFilter : ""}&${!!categoryFilter ? "category=" + categoryFilter : ""
	//     }&${!!categoryFilter2 ? "category=" + categoryFilter2 : ""}&${!!categoryFilter3 ? "category=" + categoryFilter3 : ""
	//     }&${!!searchMarkaz && "name=" + searchMarkaz}
	// `,
	//     fetcher,
	//     {
	//       fallbackData: allMarkaz,
	//       refreshInterval: 30000,
	//     }
	//   );

	const { data: responseMarkaz, error, mutate } = useSWR('/api/markaz', fetcher, { fallbackData: allMarkaz, refreshInterval: 30000 })


	const GridViewMarkaz = () => {
		return (
			<GridView data={responseMarkaz} variant='markaz' />
		);
	};

	const handleChangeName = (event) => {
		setNameFilter(event.target.value);
		mutate();
	};

	const handleChangeLocation = (event) => {
		setLocationFilter(event.target.value);
		mutate();
	};

	const radioMarkaz = [
		{
			title: "Urutkan Nama",
			value: nameFilter,
			onChange: handleChangeName,
			labels: [
				{
					value: "ASC",
					label: "A-Z",
				},
				{ value: "DESC", label: "Z-A" },
			],
		},
	];

	return (
		<>
			<AdminOrUserTemplate
				variant="markaz"
				GridView={<GridViewMarkaz />}
				entries={entries}
				searchTerm={searchMarkaz}
				setSearchTerm={setSearchMarkaz}
				setEntries={setEntries}
				page={page}
				setPage={setPage}
				data={responseMarkaz}
				error={error}
				locationFilter={locationFilter}
				setLocationFilter={setLocationFilter}
				nameFilter={nameFilter}
				setNameFilter={setNameFilter}
				categoryFilter={categoryFilter}
				setCategoryFilter={setCategoryFilter}
				categoryFilter2={categoryFilter2}
				setCategoryFilter2={setCategoryFilter2}
				categoryFilter3={categoryFilter3}
				setCategoryFilter3={setCategoryFilter3}
				mutate={mutate}
				FilterRadioObject={radioMarkaz}
			/>
		</>
	);
}

// export async function getStaticProps() {
// 	const staticMarkazResponse = await axiosMain.get("/markaz/search");
// 	const staticMarkaz = staticMarkazResponse.data
// 	return {
// 		props: {
// 			allMarkaz: staticMarkaz
// 		},
// 		revalidate: 10
// 	}
// }
