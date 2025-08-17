import { useState } from "react";
import styles from '../Styles/AddNotesLV.module.css';
import { toast } from "react-toastify";

function AddNotesLV({ groupName, setGroupName, onClose }) {
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
            
            toast.success(`Group "${addNotes}" created successfully!`);

            onClose();
        }

    }    

        return (
            <div className={styles.notesPopup}>
                <div className={styles.notes}>Create New group</div>
                <div className={styles.addnotes}>
                    <span className={styles.groupName}>Group Name</span>
                    <input type="text" 
                    value={addNotes} 
                    onChange={handleAddNotes} 
                    placeholder='Enter group name' />
                    {error && <span className={styles.errorText}>{groupError}</span>}
                </div>
                
                <div className={styles.choosecolor}>
                    <span>Choose color</span>
                    <div className={styles.colorOptions}>
                        <div className={styles.option1}
                        onClick={handleColorChange}
                        ></div>
                        <div className={styles.option2}
                        onClick={handleColorChange}>
                        </div>
                        <div className={styles.option3}
                        onClick={handleColorChange}>
                        </div>
                        <div className={styles.option4}
                        onClick={handleColorChange}>
                        </div>
                        <div className={styles.option5}
                        onClick={handleColorChange}>
                        </div>
                        <div className={styles.option6}
                        onClick={handleColorChange}>
                        </div>
                    </div>
                </div>
                <div className={styles.closePopup}>
                    <button className={styles.createBtn}
                     onClick={saveNotes}>Create</button>
                </div>
            </div>
        )
}
export default AddNotesLV