export default function PetCard({ pet }) {
  return (
    <div key={pet._id}>
      <div className="card">
        <img src={pet.image_url} />
        <h5 className="pet-name">{pet.name}</h5>
        <div className="main-content">
          <p className="pet-name">{pet.name}</p>
          <p className="owner">Owner: {pet.owner_name}</p>

          {/* Extra Pet Info: Likes and Dislikes */}
         
          <div className="btn-container">
           
          </div>
        </div>
      </div>
    </div>
  );
}
