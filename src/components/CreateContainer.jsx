import { doc, setDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { React, useState } from 'react';
import { MdFastfood, MdCloudUpload, MdFoodBank, MdDelete, MdAttachMoney } from 'react-icons/md';
import { storage, firestore } from '../firebase.config.js';
import { categories } from '../utils/categories.js';
import Loader from './Loader.jsx';

const CreateContainer = () => {
    // console.log(categories);
    const [title, setTitle] = useState("");
    const [calories, setCalories] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [imageAsset, setImageAsset] = useState(null);
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState("");
    const [msg, setMsg] = useState(null);
    const [isloading, setIsloading] = useState(false);

    const uploadImage = (e) => {
        setIsloading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        setFields(true);
                        setMsg('Upload is paused');
                        setAlertStatus('danger');
                        setTimeout(() => {
                            setFields(false);
                            setMsg(null);
                            setAlertStatus('');
                        }, 4000);
                        break;
                    case 'running':
                        console.log('Upload is running');
                        setFields(true);
                        setMsg('Upload is running');
                        setTimeout(() => {
                            setFields(false);
                            setMsg(null);
                        }, 4000);
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                if (error) {
                    setIsloading(false);
                    setFields(true);
                    setMsg('Something went wrong! Try again later.');
                    setAlertStatus('danger');
                    setTimeout(() => {
                        setFields(false);
                        setMsg(null);
                        setAlertStatus('');
                    }, 4000);
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                setFields(true);
                setMsg('Upload is completed successfully!');
                setTimeout(() => {
                    setFields(false);
                    setMsg(null);
                }, 4000);
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    if (downloadURL) {
                        setImageAsset(downloadURL);
                        setIsloading(false);
                    }
                });
            }
        );
    }

    const deleteImage = () => {
        setIsloading(true);
        const storageRef = ref(storage, imageAsset);
        deleteObject(storageRef).then(() => {
            setImageAsset(null);
            setIsloading(false);
            setFields(true);
            setMsg('The image is deleted successfully.');
            setAlertStatus('');
            setTimeout(() => {
                setFields(false);
                setMsg(null);
            }, 4000);
        }).catch(err => {
            setIsloading(false);
            setFields(true);
            setMsg('Something went wrong! Try again later.');
            setAlertStatus('danger');
            setTimeout(() => {
                setFields(false);
                setMsg(null);
                setAlertStatus('');
            }, 4000);
        })
    }


    const saveDetails = async () => {
        console.log(`title: ${title}, calories: ${calories}, price: ${price}, category: ${category}, imageAsset: ${imageAsset}`);
        try {
            if (!title || !calories || !price || !category || !imageAsset) {
                setFields(true);
                setMsg("Required fields can not be empty!");
                setAlertStatus('danger');
                setTimeout(() => {
                    setFields(false);
                    setMsg(null);
                    setAlertStatus('');
                }, 4000);
            } else {
                const newFood = {
                    id: Date.now(),
                    title: title,
                    category: category,
                    calories: calories,
                    price: price,
                    imageUrl: imageAsset
                }
                await setDoc(doc(firestore, "FoodItem", `${Date.now()}`), newFood, { merge: true });
                setFields(true);
                setMsg("The food is saved successfully!");
                setTitle("")
                setCategory("")
                setCalories("")
                setPrice("")
                setImageAsset(null)
                setAlertStatus('');
                setTimeout(() => {
                    setFields(false);
                    setMsg(null);
                }, 4000);
            }
        } catch (error) {
            setFields(true);
            setMsg("Something went wrong! Please try again later.");
            setAlertStatus('danger');
            setTimeout(() => {
                setFields(false);
                setMsg(null);
                setAlertStatus('');
            }, 4000);
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <div className="w-[98%] h-full flex flex-col items-center justify-center md:w-[75%] p-4 border-2 border-gray-300 rounded-lg gap-3">
                {fields &&
                    <p className={`w-full rounded-lg p-2 text-lg text-center font-semibold ${alertStatus === "danger" ? "bg-red-400 text-red-900" : "bg-emerald-400 text-emerald-900"}`}>
                        {msg}
                    </p>}
                <div className="w-full flex items-center border-b border-gray-300 py-2 gap-2">
                    <MdFastfood className='text-2xl text-gray-700' />
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full h-full bg-transparent text-lg outline-none border-none placeholder:text-gray-400 text-textColor"
                        placeholder='Give me a title...'
                    />
                </div>
                <div className="w-full">
                    <select onChange={(e) => setCategory(e.target.value)}
                        defaultValue={category}
                        className="w-full text-base outline-none p-2 border-b border-gray-300 rounded-md"
                    >

                        <option value="other" className="outline-none text-base text-headingColor bg-white capitalize">Select Category</option>
                        {categories && categories.map(ctgry =>
                            <option
                                key={ctgry.id}
                                value={ctgry.urlParamName}
                                className="outline-none text-base text-headingColor bg-white capitalize">
                                {ctgry.name}
                            </option>)}
                    </select>
                </div>


                <div className="w-full h-[200px] md:h-[400px] border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center group">
                    {isloading ?
                        <Loader />
                        : <>
                            {!imageAsset ?
                                <label className="w-full h-full rounded-lg flex flex-col items-center justify-center group">
                                    <MdCloudUpload className="text-4xl font-semibold text-gray-400 group-hover:text-gray-600" />
                                    <p className="text-base text-gray-400 group-hover:text-gray-600">Click here to upload</p>
                                    <input type="file" name="uploadImage" accept="image/*" className="w-0 h-0" onChange={uploadImage} />
                                </label>
                                :
                                <>
                                    <div className="relative h-full">
                                        <img src={imageAsset} alt="ProductImage" className="w-full h-full object-cover" />
                                        <button className="absolute bottom-3 right-3 rounded-full bg-red-500 text-white hover:shadow-lg outline-none w-[50px] h-[50px] flex justify-center items-center hover:scale-125 hover:bg-red-600 transition-all duration-300 ease-in-out" onClick={deleteImage}><MdDelete className="text-white text-4xl" /></button>
                                    </div>
                                </>
                            }
                        </>
                    }

                </div>

                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    <div className="w-full py-2 flex items-center gap-2 border-b border-gray-300">
                        <MdFoodBank className="text-2xl text-gray-700" />
                        <input
                            type="text"
                            required
                            value={calories}
                            name="calories"
                            className="w-full bg-transparent outline-none text-lg placeholder:text-gray-400 text-textColor "
                            placeholder="Calories"
                            onChange={(e) => setCalories(e.target.value)} />
                    </div>

                    <div className="w-full py-2 flex items-center gap-2 border-b border-gray-300">
                        <MdAttachMoney className="text-2xl text-gray-700" />
                        <input
                            type="text"
                            required
                            value={price}
                            name="price"
                            className="w-full bg-transparent outline-none text-lg placeholder:text-gray-400 text-textColor "
                            placeholder="Price"
                            onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </div>


                <button className="w-full md:w-auto px-10 py-2 outline-none border-none bg-emerald-500 text-white text-lg font-semibold rounded-lg ml-0 md:ml-auto hover:shadow-md" onClick={saveDetails}>Save</button>
            </div>
        </div>
    );
};

export default CreateContainer;