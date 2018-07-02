import React from 'react'
import './Privacy.less'
import { Layout, Row, Icon } from 'antd'

const Privacy = props => {
  return (
    <Layout>
      <Layout.Header style={{ background: '#f0f2f5' }}>
        <Row type='flex' align='flex-start' justify='middle'>
          <h1 style={{ letterSpacing: '3px', marginBottom: 0 }}>
            <b>9 DOTS</b>
          </h1>
          <Icon type='right' style={{ margin: '0 10px' }} />
          <h2 style={{ marginBottom: 0 }}>Privacy Policy</h2>
        </Row>
      </Layout.Header>
      <Layout.Content style={{ padding: '20px 50px', background: 'white' }}>
        <Section title='About 9 Dots'>
          <p>
            9 Dots is a non-profit organization dedicated to providing
            transformative computer science education for every student in
            underserved LA schools.
          </p>
          <p>
            We understand how important privacy is to our community. The purpose
            of this Privacy Policy is to be as transparent as possible about the
            data that we collect through the 9 Dots Website, why we collect it,
            and how we collect it. We want you to be informed of your rights and
            choices as a User of the 9 Dots Website.
          </p>
          <p>
            9 Dots is committed to protecting Users’ information. The purpose of
            the 9 Dots Website is to provide a safe online environment for
            Teachers and Students to engage in computer science education.
            Anyone can visit the 9 Dots Website and browse 9 Dots course
            material without signing into an account (however, an account is
            necessary for saving course content and progress). Any and all data
            that we collect is used solely in service of our mission of
            providing an excellent computer science education experience for our
            Users. We do not run any ads on our Website, nor do we use any
            Users’ Personal Information for financial gain in any way. As a
            501(c)(3) non-profit organization, our revenue comes from grants,
            donations, and school subscription fees. We established ourselves as
            a non-profit organization so that a for-profit motive will not
            interfere with our mission. We do our best to provide you with
            control of the information that you provide to 9 Dots via our
            Website. If you have any questions, please contact us at
            help@9dots.org.
          </p>
        </Section>
        <Section title='Privacy Policy'>
          <p>
            For the purposes of this Privacy Policy, our websites located at
            https://www.9dots.org, https://app.9dots.org, our application
            programming interface (our “API”), and online services are
            collectively referred to as our “Website.” Visitors and users of the
            Website are referred to individually as “User” and collectively as
            “Users”. Any User with a student account is referred to as “Student”
            even if they are using the 9 Dots Website outside of a school
            setting. Similarly, any User that creates a teacher account is
            referred to as “Teacher.”
          </p>
          <p>
            Your use of the Website and any information you provide on the
            Website are subject to the terms of this Privacy Policy. By visiting
            or using our Website, you expressly consent to the information
            handling practices described in this Privacy Policy.
          </p>
        </Section>
        <Section title='Collection and Use of Your Information'>
          <p>
            The table below describes the type of data that is collected by 9
            Dots when Users interact with our Website, under what circumstances
            this data is collected, and how specifically the data is used. For
            the purposes of this Privacy Policy, <b>“Personal Information”</b>{' '}
            means any information that identifies you as an individual.
            Technical data such as persistent cookies or IP addresses are
            referred to as
            <b>“Persistent Identifiers.”</b> We collectively refer to any data
            we collect from Students, along with any Student information and
            Student records as “Student Data.” We obtain data relating to our
            Users from various sources described below.
          </p>
          <p>
            Our collection, use, and disclosure of Student Data are governed by
            our Privacy Policy and also by the Family Educational Rights and
            Privacy Act (FERPA), the Children's Online Privacy Protection Act
            (COPPA), Global Data Protection Regulation (GDPR), and applicable
            state laws that relate to the collection of Student Data, including
            California’s Student Online Personal Information Protection Act
            (SOPIPA).
          </p>

          <table className='privacy-table'>
            <tr>
              <th>Data stored by 9 Dots for Teacher accounts</th>
              <th>How/when the data is collected</th>
              <th>How the data is used</th>
            </tr>
            <tr>
              <td>Gmail address</td>
              <td rowSpan='4'>
                Required in order to create a Teacher account.
              </td>
              <td>
                Used for Google authentication and occasionally sending notices
                to the Teacher about the Website.
              </td>
            </tr>
            <tr>
              <td>Full name</td>
              <td>To associate a Teacher with their class(es).</td>
            </tr>
            <tr>
              <td>Display name</td>
              <td>
                The name that Students in a class will see (e.g. “Mrs. Smith”)
              </td>
            </tr>
            <tr>
              <td>School name</td>
              <td>To associate a Teacher with their school.</td>
            </tr>
            <tr>
              <td>Class data</td>
              <td>
                Upon account creation, the Teacher is prompted to either join or
                create a class. They can then create Student accounts in that
                class.
              </td>
              <td>
                To associate a Teacher with their Students’ data. When creating
                a new class, the Teacher inputs a class name, specifies grade
                level, and can then add Students and assign coursework. The
                class grouping data is used to simplify Teachers’ view of
                Students across multiple classes.
              </td>
            </tr>
            <tr>
              <td>Survey & demographic data</td>
              <td>
                Collected through surveys as Teachers progress through online
                professional learning courses.
              </td>
              <td>
                Used for the purposes of evaluating our own work and improving
                our education results. Any survey data shared with external
                parties will be de-identified and aggregated.
              </td>
            </tr>
            <tr>
              <td>
                Progress in online professional learning, including the
                date/time each lesson is accessed, the number of tries to
                complete an activity and whether it was completed successfully,
                time spent on an activity, code that a Teacher submits, and
                Teachers’ answers to prompts (e.g. checks for understanding,
                attitudinal questions)
              </td>
              <td>
                Collected as Teachers progress through online professional
                learning courses.
              </td>
              <td>
                Progress in online professional learning courses for Teachers
                are stored in their Teacher account in order to allow Teachers
                to pick up where they left off.
                <br />
                <br />
                This data may also be used for the purposes of evaluating our
                own work and improving our education results. Any survey data
                shared with external parties will be de-identified and
                aggregated.
              </td>
            </tr>
            <tr>
              <td>Teacher-created courses</td>
              <td>Collected as Teachers create courses.</td>
              <td>
                Teachers have the option to create their own courses in the
                platform, which they can assign to Students or other Teachers.
              </td>
            </tr>
            <tr>
              <th>Data stored by 9 Dots for Student accounts</th>
              <th>How/when the data is collected</th>
              <th>How the data is used</th>
            </tr>
            <tr>
              <td>Full name</td>
              <td rowSpan='2'>
                Required in order to create a Student account.
              </td>
              <td>
                To associate a Student with their Teacher(s) and class(es).
              </td>
            </tr>
            <tr>
              <td>Email address</td>
              <td>
                Used solely as a unique identifier to track Student data even if
                they switch schools/Teachers/classes. We will never send emails
                directly to Students through the platform.
              </td>
            </tr>
            <tr>
              <td>
                Progress in online courses, including the date/time each lesson
                is accessed, the number of tries to complete an activity and
                whether it was completed successfully, time spent on an
                activity, code that a Student submits, and Students’ answers to
                prompts (e.g. checks for understanding, attitudinal questions).
              </td>
              <td>Collected as students progress through online courses.</td>
              <td>
                Displayed to Students and their Teachers to see their progress
                in a course, to see the code they’ve created, and to identify
                activities/concepts they may need help with. It also lets
                Students pick up where they left off if they sign out and sign
                in later.
                <br />
                <br />
                This data may also be used for the purposes of evaluating our
                own work and improving our education results. Any survey data
                shared with external parties will be de-identified and
                aggregated.
              </td>
            </tr>
            <tr>
              <td>Survey & demographic data</td>
              <td>
                Collected through surveys as Students progress through online
                courses.
              </td>
              <td>
                Used for the purposes of evaluating our own work and improving
                our education results. Any survey data shared with external
                parties will be de-identified and aggregated.
              </td>
            </tr>
          </table>
          <p>
            Teachers may update, correct, or delete Personal Information in
            their and their Students’ 9 Dots accounts at any time via their
            Settings and Class Settings pages. Teachers also have the ability to
            change the password of any Student in their class. A parent or legal
            guardian of a Student under the age of 18 may also review Personal
            Information and correct erroneous information, if any, by asking the
            Teacher to access the Student account.
          </p>
          <p>
            Teachers can create accounts on behalf of Students. When registering
            an account for a Student who is under the age of 13 (a “Child”), the
            Teacher represents and warrants that they or the educational
            organization they work for has proper permission to register the
            Child for the 9 Dots’ Website, and that they or the educational
            organization has obtained the necessary parental consent for
            collection of some of the Child’s Personal Information for the use
            and benefit of the school and for no other commercial purpose. In
            addition, they agree to be bound by this Privacy Policy on behalf of
            the educational organization they work for, and are authorized to do
            so.
          </p>
          <p>
            Student data of any Student that is in a Teacher's class will
            continue to be under the control of the Teacher. The Teacher for a
            class gets access to the Student's course progress, display name and
            password for the duration of time that the Student is associated
            with that Teacher’s class.
          </p>
          <p>
            In order to allow Users to recover deleted accounts, we will save
            progress, code creations and data for a period of time. A User can
            email help@9dots.org to request permanent deletion of their account
            and all the associated data. A Teacher, school or parent may also
            request the deletion of Student accounts or particular Student Data
            the same way.
          </p>
        </Section>
        <Section title='Technical Information'>
          <p>
            To ensure a high-quality teaching and learning experience for our
            Users, we may use various technologies that automatically collect
            certain information from your device. This includes Internet
            Protocol (IP) address, browser type, clickstream data, operating
            system, time spent on each page of the Website, and date/time of
            last login.
          </p>
          <p>
            Regardless of whether you have registered for an account on the 9
            Dots Website, we may send you one or more cookies (small files that
            hold data about a specific User, which allows the Website to
            remember information about your activity and deliver a more
            personalized learning experience). We collect information via
            cookies to 1) ensure that the Website works properly for all Users,
            2) facilitate a faster and more personalized experience for Users,
            and 3) help us improve our Website and its contents. Please note
            that without cookies enabled in your browser, you will not have
            access to certain services and features on the Website.
          </p>
          <p>
            9 Dots does not allow advertising on our Website, and we do not have
            the ability to collect your web search history
          </p>
        </Section>
        <Section title='Information from Third Party Authentication Services'>
          <p>
            When you register for a 9 Dots account through Google Accounts, you
            give 9 Dots the permission to store and use information already
            associated with your Google Account consistent with this Privacy
            Policy and the table above.
          </p>
          <p>
            You should check your privacy settings on your Google account to
            understand and change the information sent to us through Google’s
            Authentication Service. Please review Google’s terms of use and
            privacy policies carefully before using their services and
            connecting to our Website.
          </p>
        </Section>
        <Section title='Third Party Service Providers'>
          9 Dots uses some third party services to implement certain features on
          our Website, including (but not limited to) Google Cloud Services (for
          website hosting and data storage) and Google Analytics (for
          understanding how our Website is used). Data will be used and stored
          by these third parties solely in the context of providing these
          implementation services to 9 Dots; these third parties will not
          receive any ownership or have any other rights to access or use this
          data.
        </Section>
        <Section title='Message Sending Between Website Users'>
          <p>
            Students may be asked to respond to surveys or prompts embedded
            within a course. These responses would be visible by their Teacher.
          </p>
          <p>
            Otherwise, there is currently no system within our Website for Users
            to communicate directly with one another, either through direct
            messages or comments or any other means.
          </p>
        </Section>
        <Section title='Testing Websites'>
          <p>
            For the purposes of testing our Website and services before
            releasing them to all Users, we use a testing version of our
            services for internal testing purposes only. This is meant only for
            experimental use by 9 Dots employees and is not considered part of
            the Website as defined in this agreement. Any information provided
            while using the testing version of our Website is not covered by
            this Privacy Policy.
          </p>
        </Section>
        <Section title='Children Under Age 13'>
          <p>
            9 Dots courses are designed to be used primarily by students age 13
            and under with the involvement of and pre-authorization by their
            school, teacher, parent or legal guardian.
          </p>
          <p>
            It comes to 9 Dots’s attention that Personal Information or
            Persistent Identifiers from children under the age of 13 has been
            collected without parental or teacher consent, 9 Dots will take
            appropriate steps to delete this information. As a teacher, parent
            or legal guardian of a Student on 9 Dots, you can request that 9
            Dots deactivates the Student’s account, deletes any inadvertently
            collected information, and ask that we no longer allow the Student
            to submit their information to 9 Dots’s Website. To do so, please
            contact us at help@9dots.org. Please note that we may attempt to
            verify your identity and your relationship with the Student.
          </p>
        </Section>
        <Section title='How We Share Data'>
          <p>
            We do not sell any information that we collect from Users, or
            exploit it for financial gain in any way. 9 Dots will never share
            Personal Information with third parties to use without your consent.
          </p>
          <p>
            Whenever we share Student Data, we hold our partners to privacy and
            security practices no less stringent than our own.
          </p>
          <p>
            We may share Student Data with a Student’s Teacher and limited
            Teacher information with the Student. If a Student is in a Teacher’s
            class, we will share Student account information and course progress
            with that Teacher so the Teacher can manage the Student’s progress.
            The Student will also see limited information about their Teacher
            including their Teacher’s display name and class information.
          </p>
          <p>
            We may share Student achievement data with the Student’s school or
            school district. We may allow the Student’s school or school
            district to access the same Student progress data that has already
            been shared with the Student’s Teacher(s). We may also share Student
            achievement data with 9 Dots’s co-teachers and teaching assistants
            in order to better facilitate and differentiate student learning in
            the classrooms that they support.
          </p>
          <p>
            We may share limited information when you contact us for support.
            When you contact us with a question or issue, you may provide
            Personal Information, which is shared with 9 Dots employees in order
            to respond to your inquiry. 9 Dots employees use Personal
            Information only in the context of addressing your specific inquiry.
          </p>
          <p>
            We may publish de-identified information about Student performance.
            However, we will never publicly disclose Personal Information in
            these reports. Data about Student performance will remain
            de-identified. De-identified data representing large populations of
            Students may be reported by demographic criteria such as age,
            general location, gender, ethnicity, and socioeconomic status.
          </p>
          <p>
            We may share de-identified data to improve our services and learn
            more about our Users. 9 Dots may work with third parties (such as
            universities and education research organizations) to improve our
            products and services. 9 Dots may share de-identified information
            with authorized partners in order to inform research efforts and
            gain insights into the usage of our content and services. We require
            any research partner that receives de-identified data from us to
            agree in advance that they will not attempt to use this data to
            identify our Users.
          </p>
          <p>
            We will share data when required by law. 9 Dots may disclose User
            data including Personal Information or Persistent Identifiers if
            required to do so by law, or if we have a good-faith belief that
            such action is necessary to comply with local, state, federal,
            international, or other applicable laws or respond to a court order,
            judicial or other government order, subpoena, or warrant, or
            administrative request. In some cases, we may make such disclosures
            without first providing notice to Users, Teachers, schools, parents
            or legal guardians.
          </p>
          <p>
            We may share data when necessary or appropriate to protect 9 Dots or
            others. 9 Dots may disclose User data including Personal Information
            or Persistent Identifiers that we believe, in good faith, is
            appropriate or necessary to: take precautions against liability;
            protect 9 Dots from fraudulent, abusive, or unlawful uses;
            investigate and defend ourselves against any third-party claims or
            allegations; assist government enforcement agencies; protect the
            security or integrity of the Website; or protect the rights,
            property, or personal safety of 9 Dots, our Users, or others.
          </p>
          <p>
            We may share data in the context of a change of business, including
            a merger or acquisition. In the event that 9 Dots is acquired by,
            combined or merged with another entity, we may transfer or assign
            the Personal Information and Persistent Identifiers that we have
            collected from Users as part of such merger, acquisition, sale, or
            other change of control. Our promise to you is that any Personal
            Information and Persistent Identifiers we have collected from Users
            would be safeguarded by the acquiring organization under the same
            level of safety and privacy as afforded by this Privacy Policy.
          </p>
        </Section>
        <Section title='Our Approach to Data Security'>
          <p>
            To protect your privacy and security, we take reasonable steps to
            verify your identity before granting you account access or making
            corrections to your Personal Information. If you have any questions
            about how we handle or protect your personal data, please contact us
            at help@9dots.org.
          </p>
          <p>
            Our Website stores data via Google Cloud Firestore. Firestore
            automatically encrypts all data under the 256-bit Advanced
            Encryption Standard. This provides an extra layer of protection for
            all data stored in our database.
          </p>
          <p>
            While we strive to maintain best industry-standard privacy and
            security practices, it should be noted that no system is fail proof.
            If we learn of a security breach that jeopardizes the Personal
            Information on our Website, we will attempt to notify you
            electronically so that you can take appropriate protective steps.
          </p>
        </Section>
        <Section title='Conditions of Use and Notices'>
          <p>
            If you choose to visit our Website, your visit and any dispute over
            privacy is subject to this Privacy Policy, including limitations on
            damages, arbitration of disputes, application of the law of the
            State of California and venue for all disputes in Los Angeles,
            California.
          </p>
          <p>
            If any provision of this Privacy Policy or our Terms of Service is
            held invalid by a court of competent jurisdiction, the remainder of
            this Privacy Policy will remain in full force and effect.
          </p>
        </Section>
        <Section title='No Commercial Use of Student Data'>
          California’s Student Online Personal Information Protection Act
          (SOPIPA) prohibits the gathering of the Personal Information of K-12
          students for advertising or other non-educational purposes. 9 Dots
          abides by such laws and shall not to use, disclose, or compile any
          student Personal Information for the purpose of marketing or
          advertising commercial products or services.
        </Section>
        <Section title='You can review or delete your Personal Information at any time'>
          <p>
            We keep your personal data only as long as necessary or for the
            purposes for which it was collected or as required under any
            contract or by applicable law.
          </p>
          <p>
            If, at any point, you wish to access, amend, erase, export, or
            object to or restrict the processing of Personal Information
            collected via our Website, send us a request at help@9dots.org We
            will promptly review all such requests in accordance with applicable
            laws.
          </p>
        </Section>
        <Section title='Updates to our Privacy Policy'>
          9 Dots may occasionally make amendments to the Privacy Policy when
          necessary. We will notify Users of any change to our Privacy Policy by
          posting the revised Privacy Policy with an updated date of revision on
          our Website. If significant changes are made, we will contact Users
          electronically to inform them of these changes. Your continued use of
          the Site following these changes means that you accept the revised
          Privacy Policy.
        </Section>
        <Section title='Contacting 9 Dots'>
          Please contact 9 Dots with any questions or comments about this policy
          or the use of Personal Information by writing us at help@9dots.org or
          at 931 N. Highland Ave, Los Angeles, CA 90038.
        </Section>
      </Layout.Content>
    </Layout>
  )
}

Privacy.propTypes = {}

export default Privacy

const Section = ({ title, children }) => (
  <div style={{ margin: '0 auto', maxWidth: 850 }}>
    <h3 style={{ paddingTop: 14 }}>
      <b>{title}</b>
    </h3>
    <p>{children}</p>
  </div>
)
