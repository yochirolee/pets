import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import PetCard from "../components/Cards/PetCard/PetCard";

const getPostQuery = gql`
  query getPost {
    getPosts {
      id
      body
      createdAt
    }
  }
`;
const getPetsQuery = gql`
  query {
    getPets {
      id
      owner_name
      species
      age
      poddy_trained
      image_url
    }
  }
`;

const Index = () => {
  const { data, loading, error } = useQuery(getPetsQuery);

  if (loading) {
    return <p>...Loading</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  if (data) {
    return (
      <div>
        {data.getPets.map((pet) => (
          <PetCard pet={pet} key={pet.id}></PetCard>
        ))}
      </div>
    );
  }
};

export default Index;
