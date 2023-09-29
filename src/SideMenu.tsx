import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

interface MenuItem {
    Label: String,
    Icon: React.ReactNode,
    isDropDown: boolean,
    submenuItems: String[]
};
function SideMenu(){
const [submenuOpen, setSubmenuOpen] = useState(false);
const machineLearningItems = ["Example 1", "Example 2", "Example 3"];
const iconStyle = {fontSize: '30px', marginRight: '5px', marginLeft: '25px', color: '#3f9ac9'};
const menuItems = [{Label: "Start", Icon: <HomeIcon sx = {iconStyle}/>, isDropDown: false}, 
{Label: "Machine Learning", Icon: <MenuIcon sx = {iconStyle}/>, isDropDown: true, submenuItems: machineLearningItems}];


function menuClick(isDropDown: boolean){
    if(isDropDown) {
    setSubmenuOpen(!submenuOpen);
    } else {
        
    }
}

return(
<div style = {{width: '250px', backgroundColor: '#e8e9eb'}}>
{menuItems.map(item => (
<div onClick = {()=> menuClick(item.isDropDown)} key = {item.Label}>
    <div style={{display: 'flex', alignItems: 'center', marginBottom: "10px", color: '#3f9ac9'}}>
    {item.Icon} {item.Label} {item.isDropDown ? <ExpandMoreIcon /> : undefined} 
    </div>
    {submenuOpen ? <div style={{ marginLeft: "45px", color: '#3f9ac9'}}>
        {item.submenuItems?.map(subItem => <div>{subItem}</div>)}
        </div> : undefined}
</div>))}
</div>
)
}

export default SideMenu;