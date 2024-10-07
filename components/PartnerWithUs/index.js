import React from 'react'

import styles from './styles.module.scss'

const PartnerWithUs = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Partner With Us</h3>
      <p className={styles.description}>
        Droppp delivers a turnkey solution, allowing companies an end-to-end
        first-class NFT delivery experience, offering easy payment methods all
        the way through to physical item delivery.
      </p>

      <a href="mailto:partnerships@droppp.io" className={styles.btn}>
        Contact
      </a>
    </div>
  );
};

export default PartnerWithUs;
