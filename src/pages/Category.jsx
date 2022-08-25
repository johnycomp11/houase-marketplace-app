import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spiinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get reference to db and get listings
        const listingsRef = collection(db, "listings");

        //create query to find where type == category name in listingRef of db
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        //execute query to get snapshot
        const querySnap = await getDocs(q);

        const listings = [];

        //loop through query snapshot
        querySnap.forEach((doc) => {
          console.log(doc.data());
          //add to listings array
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        //set data from query loop to listings array
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listings");
      }
    };
    fetchListings();
  }, [params.categoryName]);

  return (
    <div className="categoryName">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places For Rent"
            : "Places For Sale"}
        </p>
      </header>
      {loading ? (
        <Spiinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
