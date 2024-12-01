import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";



const UpdateCoffee = () => {
    const coffee = useLoaderData();
    const {_id, name, quantity, supplier, taste, category, details, photo } = coffee;

    const handleUpdateCoffee = (e) => { 
        //s1 form create kore submit korle data gula dekhte pabo client side a
        e.preventDefault();
        const form=e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;

        const updateCoffee = {
            name,
            quantity,
            supplier,
            taste,
            category,
            details,
            photo
        };
        console.log(updateCoffee);

        // Firt a server side (backend a) a data pathanor jonno POST API fetch use korte hobe
        fetch(`http://localhost:5000/coffee/${_id}`,{

            // UPDATE er jonno PUT method use korte hobe
            method:'PUT',
            headers:{
                'content-Type':'application/json'
            },
            body:JSON.stringify(updateCoffee)
        })
        .then(res=>res.json())
        .then(data=>
        {
            console.log(data)
            if(data.modifiedCount>0){
                Swal.fire({ 
                    title: 'Success!',
                    text: 'Coffee Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
                form.reset();
            }
        });
           
        //s1
    };


    return (
        <div className="max-w-full container mx-auto bg-[#F4F3F0] p-24" >
            <h2 className="text-3xl font-extrabold text-center">Update Coffee : {name}</h2>
            <form onSubmit={handleUpdateCoffee} className="mt-8 w-full space-y-4">
                <div className="md:flex gap-5 justify-center">
                    <label className="form-control w-full max-w-lg">
                    <div className="label">
                        <span className="label-text text-lg">What is your name?</span>
                    </div>
                    <input name="name" defaultValue={name} type="text" placeholder="Type here" className="input input-bordered w-full max-w-lg" />
                </label>
                <label className="form-control w-full max-w-lg">
                    <div className="label">
                        <span className="label-text text-lg">Available Quantity?</span>
                    </div>
                    <input name="quantity" defaultValue={quantity} type="text" placeholder="Type here" className="input input-bordered w-full max-w-lg" />
                </label>
                </div>

                <div className="md:flex gap-5 justify-center">
                    <label className="form-control w-full max-w-lg">
                    <div className="label">
                        <span className="label-text text-lg">Supplier Name</span>
                    </div>
                    <input name="supplier" defaultValue={supplier} type="text" placeholder="Type here" className="input input-bordered w-full max-w-lg" />
                </label>
                <label className="form-control w-full max-w-lg">
                    <div className="label">
                        <span className="label-text text-lg">Taste</span>
                    </div>
                    <input name="taste" defaultValue={taste} type="text" placeholder="Type here" className="input input-bordered w-full max-w-lg" />
                </label>
                </div>
                <div className="md:flex gap-5 justify-center">
                    <label className="form-control w-full max-w-lg">
                    <div className="label">
                        <span className="label-text text-lg">Category</span>
                    </div>
                    <input name="category" defaultValue={category} type="text" placeholder="Type here" className="input input-bordered w-full max-w-lg" />
                </label>
                <label className="form-control w-full max-w-lg">
                    <div className="label">
                        <span className="label-text text-lg">Details</span>
                    </div>
                    <input name="details" defaultValue={details} type="text" placeholder="Type here" className="input input-bordered w-full max-w-lg" />
                </label>
                </div>


                <div className=" flex justify-center ">
                    <label className="form-control w-full max-w-[1045px]">
                    <div className="label">
                        <span className="label-text text-lg">Photo URL</span>
                    </div>
                    <input name="photo" type="text" defaultValue={photo} placeholder="Type here" className="input input-bordered w-full " />
                </label>
                </div>

                <div className="flex justify-center pt-3">
                <button value="Update Coffe" className="btn max-w-[1045px] btn-block btn-neutral">Add Coffe</button>
                </div>
                
            </form>
        </div>
    );
};

export default UpdateCoffee;