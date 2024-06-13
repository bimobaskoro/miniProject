import CardHomeComponent from "./_component/cardHome.component";
import NavbarComponent from "./_component/navbar.component";
import SearchComponent from "./_component/search.component";
export default function HomeUser() {
  return (
    <>
      <NavbarComponent />
      <SearchComponent />
      <CardHomeComponent />
    </>
  );
}
