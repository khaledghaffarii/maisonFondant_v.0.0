import React from 'react';
import { useTranslation } from 'react-i18next';
import i18next from '../../../i18n';
import navigationConfig from '../../fuse-configs/navigationConfig';
import arabeLanguage from '../../fuse-configs/navigationLanguage/arabeLanguage.js';
import englishLanguage from '../../fuse-configs/navigationLanguage/englishLanguage.js';
import frenchLanguage from '../../fuse-configs/navigationLanguage/frenchLanguage.js';
//C:\Users\user\Desktop\TrustItGit\trustit-test\Frontend\Team\src\app\fuse-layouts\shared-components\navigationLanguage\arabeLanguage.js
//import i18next from '../../i18n';

function LanguageSwitcher() {
	const { t, i18n } = useTranslation();
	//const {i18next}=i18next();
	return (
		<div className='select'>
			<select
				style={{ margin: '25px 10px 0px 0px' }}
				value={i18n.language}
				onChange={(e) => {
					localStorage.setItem('lang', e.target.value);
					i18n.changeLanguage(e.target.value);
					if (e.target.value == 'ar') {
						navigationConfig[0].children = arabeLanguage;
					} else if (e.target.value == 'en') {
						navigationConfig[0].children = englishLanguage;
					} else {
						navigationConfig[0].children = frenchLanguage;
					}
					//console.log("i18next.language"+i18next.language+"t[0].title",navigationConfig[0].children);
				}}>
				<option value='en'>English</option>

				<option value='fr'>Français</option>
			</select>
		</div>
	);
}

export default LanguageSwitcher;
