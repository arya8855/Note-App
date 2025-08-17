import { useState } from "react";
import styles from '../Styles/AddNotesMV.module.css';
import { toast } from "react-toastify";


function AddNotesMV({ groupName, setGroupName, onClose }) {
    const [addNotes, setAddNotes] = useState('');
    const [color, setColor] = useState('');
    const [error, setError] = useState(false);
    const [groupError, setGroupError] = useState("");

   const handleAddNotes = (e) => {
        setAddNotes(e.target.value);
        setGroupError("");
    };

    const handleColorChange = (e) => {
        const selectedColor = getComputedStyle(e.target).backgroundColor;
        setColor(selectedColor);
    }    

    const saveNotes = () => {
        setError(true);
        if (addNotes.trim() === '') {
            setGroupError("Name cannot be empty");  
            toast.error("Group name is required!"); 
        }else if(!color){
            toast.error("Please select a color!");
            return
        }else if (groupName.some(
             (group) => group.name.toLowerCase() === addNotes.trim().toLowerCase()
            )) {
        setGroupError("This group name already exists!");
        toast.error(`Group "${addNotes}" already exists!`);
        return;    

        }else{
            const newGroup = {name: addNotes, color: color};
            setGroupName([...groupName, newGroup]);
            localStorage.setItem('groupName', JSON.stringify([...groupName, newGroup]));

            toast.success(`Group "${addNotes}" created successfully 🎉`);
            onClose();
        }

    }    

    return(
            <div className={styles.MnotesPopup}>
                <div className={styles.Mnotes}>Create New group</div>
                <div className={styles.Maddnotes}>
                    <span className={styles.MgroupName}>Group Name</span>
                    <input type="text" 
                    value={addNotes} 
                    onChange={handleAddNotes} 
                    placeholder='Enter group name' />
                    {error && <span className={styles.MerrorText}>{groupError}</span>}
                </div>
                
                <div className={styles.Mchoosecolor}>
                    <span>Choose Colour</span>
                    <div className={styles.McolorOptions}>
                        <div className={styles.Moption1}
                        onClick={handleColorChange}
                        ></div>
                        <div className={styles.Moption2}
                        onClick={handleColorChange}>
                        </div>
                        <div className={styles.Moption3}
                        onClick={handleColorChange}>
                        </div>
                        <div className={styles.Moption4}
                        onClick={handleColorChange}>
                        </div>
                        <div className={styles.Moption5}
                        onClick={handleColorChange}>
                        </div>
                        <div className={styles.Moption6}
                        onClick={handleColorChange}>
                        </div>
                    </div>
                </div>
                <div className={styles.MclosePopup}>
                    <button className={styles.McreateBtn}
                     onClick={saveNotes}>Create</button>
                </div>
            </div>
    )
}
export default AddNotesMV