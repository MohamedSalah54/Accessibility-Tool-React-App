import styles from "./Footer.module.css"
const AccessabilityState = ({ closeCard }) => { // تمرير دالة إغلاق البطاقة من الـ parent
  return (
    <div className={styles.overlay}>
      <div className={styles.card_container}>
        <div className={styles.card}>
          <h1>Accessibility certificate document</h1>
          <span>Production</span>
          <p>
          This Certificate verifies that this site has been reviewed and tested by software developers and remediated to be meet standards set by the WCAG 2.2 (Web Content Accessibility Guidelines 2.2) AA level. The Web Content Accessibility Guidelines (WCAG 2.2) AA level covers a wide range of recommendations for making Web content more accessible.

            The WCAG 2.2 AA level guidelines include specific details on how to develop accessible Web content. This statement certifies that specific techniques were met for the Success Criterion detailed by WCAG. As a result your content has been made accessible to a wider range of people with disabilities, including blindness and low vision, deafness and hearing loss, learning disabilities, cognitive limitations, limited movement, speech disabilities, photosensitivity and combinations of these. By implementing and adhering to these guidelines your site's web content has also become more usable to users in general.

            For more information on compliance guidelines see Understanding WCAG 2.0 and Techniques for WCAG 2.0.
          </p>
        </div>
        <div className={styles.h2_acc_card}>
          <h2>Accessibility Statement</h2>
        </div>
        <button onClick={closeCard} className={styles.close_btn}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AccessabilityState;
