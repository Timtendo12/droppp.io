export const getAddressLine = address => {
  const {
    street_address1,
    street_address2,
    city,
    state,
    postal_code,
    country_name
  } = address || {}
  let formattedAddress = street_address1
  if (street_address2) {
    formattedAddress += `, ${street_address2}`
  }
  formattedAddress += `, ${city}, ${state} ${postal_code} ${country_name}`
  return formattedAddress
}
