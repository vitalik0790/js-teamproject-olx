import { clearAll } from '../api/searchInAll';
import { clearFilter } from '../api/searchInCategory';

const clearBtn = document.getElementById('clear-filter-btn');


console.log(clearBtn);



clearBtn.addEventListener('click', clearAll);
clearBtn.addEventListener('click', clearFilter)