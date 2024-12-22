import { useState } from "react";
import styles from './Footer.module.css'
const Sendfeedback = ({ closeFeedback }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    phoneNumber: '',
    issueType: '',
    problemDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.card_container}>
        <div className={styles.card}>
          <h1>Accessibility Feedback</h1>
          <h1 style={{ fontSize: '20px' }}>Have an accessibility issue? Fill out the form and click "Send Feedback".</h1>

          <form onSubmit={handleSubmit} className={styles.feedback_form}>
            <div className={styles.form_field}>
              <div className={styles.label}>
                <label htmlFor="fullName">Full Name</label>
              </div>
              <div className={styles.input_field}>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={styles.inp}
                  required
                />
              </div>
            </div>

            <div className={styles.form_field}>
              <div  className={styles.label}>
                <label htmlFor="email">Email</label>
              </div>
              <div className={styles.input_field}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.inp}
                  required
                />
              </div>
            </div>

            <div className={styles.form_field}>
              <div  className={styles.label}>
                <label htmlFor="country">Country</label>
              </div>
              <div className={styles.input_field}>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={styles.inp}
                  required
                />
              </div>
            </div>

            <div className={styles.form_field}>
              <div  className={styles.label}>
                <label htmlFor="phoneNumber">Phone Number</label>
              </div>
              <div className={styles.input_field}>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={styles.inp}
                  required
                />
              </div>
            </div>

            <div className={styles.form_field}>
              <div  className={styles.label}>
                <label htmlFor="issueType">Issue Type</label>
              </div>
              <div className={styles.input_field}>
                <select
                  id="issueType"
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  className={styles.inp}
                  required
                >
                  <option value="">--Choose a problem--</option>
                  <option value="Others">Others</option>
                  <option value="Screen Reader Adjustment">Screen Reader Adjustment</option>
                  <option value="Keyboard Navigation">Keyboard Navigation</option>
                  <option value="Text Reader">Text Reader</option>
                  <option value="Blinks Blocking">Blinks Blocking</option>
                  <option value="Monochrome">Monochrome</option>
                  <option value="Dark / Light High-contrast">Dark / Light High-contrast</option>
                  <option value="Increase/ Decrease Font Size">Increase/ Decrease Font Size</option>
                  <option value="Readable Font">Readable Font</option>
                  <option value="Larg Black / White Cursor">Larg Black / White Cursor</option>
                  <option value="Magnifier">Magnifier</option>
                  <option value="Highlight Links / Headers">Highlight Links / Headers</option>
                  <option value="Image Descriptions">Image Descriptions</option>

                </select>
              </div>
            </div>

            <div className={styles.form_field}>
              <div  className={styles.label}>
                <label htmlFor="problemDescription">Please explain your problem</label>
              </div>
              <div className={styles.input_field}>
                <textarea
                  id="problemDescription"
                  name="problemDescription"
                  value={formData.problemDescription}
                  onChange={handleChange}
                  className={styles.inp}
                  rows="4"
                  required
                />
              </div>
            </div>

            <div className={styles.form_field}>
                 <p >All fields are required.
          </p>
              <button type="submit" className={styles.submit_btn}>
                Send Feedback
              </button>
            </div>
          </form>
         
        </div>
        <div className={styles.h2_acc_card}>
          <h2>Accessibility Feedback</h2>
        </div>
        <button onClick={closeFeedback} className={styles.close_btn}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Sendfeedback;
