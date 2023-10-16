const loadPhones = async (searchBtnField, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchBtnField}`)
    const data = await res.json();
    const phones = data.data
    showPhones(phones, isShowAll);
}
const showPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';


    const showMoreBtn = document.getElementById('show-more-button');

    if (phones.length > 12 && !isShowAll) {
        showMoreBtn.classList.remove('hidden')
    }
    else {
        showMoreBtn.classList.add('hidden')
    }
    console.log('is show all', isShowAll)
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {

        const phoneDiv = document.createElement('div');
        phoneDiv.classList = 'card p-4 bg-gray-100 shadow-xl';
        phoneDiv.innerHTML = `
          <figure><img src="${phone.image}" alt="Shoes" /></figure>
          <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
           <div class="card-actions justify-center">
          <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
           </div>`;
        phoneContainer.appendChild(phoneDiv);

    });
    toggleLoadingSpinner(false);

}
const showDetails = async (id) => {
    // console.log('clicked', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data
    // console.log(phone);
    showPhoneDetails(phone);
}
const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneDetailsInModal = document.getElementById('phone-details-modal');
    phoneDetailsInModal.innerHTML = `
    <img src="${phone.image}" alt="">
    <h2 class="font-bold text-lg">${phone.name}</h2>
    <p class="font-medium text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <h5"><span class="font-medium text-sm">Storage:</span >${phone.mainFeatures.storage}</h5>
    <h5"><span class="font-medium text-sm">Display Size:</span >${phone.mainFeatures.displaySize}</h5>
    <h5"><span class="font-medium text-sm">Chipset :</span >${phone.mainFeatures.chipSet}</h5>
    <h5"><span class="font-medium text-sm">Memory :</span >${phone.mainFeatures.memory}</h5>
    <h5"><span class="font-medium text-sm">Slug :</span >${phone.slug}</h5>
    <h5"><span class="font-medium text-sm">Release data :</span >${phone.releaseDate}</h5>
    <h5"><span class="font-medium text-sm">Brand :</span >${phone.brand}</h5>
    <h5"><span class="font-medium text-sm">GPS :</span >${phone.others.GPS}</h5>
    `
    show_modal_details.showModal();
}

const searchHandle = (isShowAll) => {
    toggleLoadingSpinner(true)
    const searchBtn = document.getElementById('search-btn');
    const searchBtnField = searchBtn.value;
    loadPhones(searchBtnField, isShowAll);


}
// const searchHandle2 = () => {
//     toggleLoadingSpinner(true)
//     const searchBtn = document.getElementById('search-btn2');
//     const searchBtnField = searchBtn.value;
//     loadPhones(searchBtnField);
//     searchBtn.value = '';
// }
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}
const showMoreDisplay = () => {
    searchHandle(true);
}


