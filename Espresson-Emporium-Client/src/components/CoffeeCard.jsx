import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CoffeeCard = ({ coffee,coffees,setCoffees }) => {
    const { _id, taste, supplier, quantity, name, photo } = coffee;
    const handleDelete = (_id) => {
        console.log(_id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"

        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/coffee/${_id}`,{
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your Coffee has been deleted.',
                                'success'
                            );
                            const remainingCoffees = coffees.filter((cof) => cof._id !== _id);
                            setCoffees(remainingCoffees);
                        }
                    });
            }
        });
    };
    return (
        <div className="mt-10">
            <div className="card card-side bg-base-100 shadow-xl">
                <figure>
                    <img
                        src={photo}
                        alt="Movie" />
                </figure>
                <div className="flex justify-between w-full p-6">
                    <div className="space-y-3">
                        <h2 className="card-title">Name: {name}</h2>
                        <p>Quantity: {quantity}</p>
                        <p>Supplier: {supplier}</p>
                        <p>Taste: {taste}</p>
                    </div>
                    <div className="card-actions justify-end">
                        <div className="join join-vertical space-y-4">
                            <button className="btn">View</button>
                            <Link to={`/updateCoffee/${_id}`} className="btn bg-blue-400">Update</Link>
                            <button onClick={() => handleDelete(_id)} className="btn bg-orange-400">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CoffeeCard.propTypes = {
    coffee: PropTypes.object.isRequired,
    coffees: PropTypes.array.isRequired,
    setCoffees: PropTypes.func.isRequired
}

export default CoffeeCard;