import { clearAll } from '../api/searchInAll';
const clearBtn = document.getElementById('clear-filter-btn');


console.log(clearBtn);



clearBtn.addEventListener('click', clearAll)