import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


function Header(){
    const {t, i18n: {changeLanguage}} = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState("en");
    const handleChange = (event: SelectChangeEvent) => {
        setCurrentLanguage(event.target.value as string);
        changeLanguage(event.target.value as string);
    }
    return(
        <div style = {{borderBottom: '2px solid gray', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography height= "40px" width="250px" sx={{backgroundColor: '#3f9ac9', color: 'white', textAlign: 'center', fontSize: '25px'}}>
                DCCS Tuzla
            </Typography>
            <div>
                {t("language")} 
                <Select 
                    sx= {{width: '110px', marginLeft: '5px', height: '40px'}}
                    value = {currentLanguage}
                    label = {currentLanguage}
                    onChange = {handleChange}
                    >
                        <MenuItem value='en'>English</MenuItem>
                        <MenuItem value='de'>German</MenuItem>
                    </Select>
            </div>
        </div>
    )
}

export default Header;