import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../context/auth.context";
import hamburgerIcon from "../public/icons/hamburger.png";
import searchIcon from "../public/icons/search.png";
import cartIcon from "../public/icons/shopping-cart.png";
import userIcon from "../public/icons/user.png";

import styles from "../styles/Nav.module.scss";
import { useState } from "react";

const UserInfo = () => {
  const { userSession } = useAuth();
  return (
    <>
      {!userSession ? (
        <button onClick={() => signIn()}>Log in</button>
      ) : (
        <button onClick={() => signOut()}>Log out</button>
      )}
      {userSession ? (
        <Link href={`/user/${userSession.email}`} passHref>
          <button>
            {userSession.name ? userSession.name : userSession.email}
          </button>
        </Link>
      ) : null}
    </>
  );
};

const PhoneMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showUser, setShowUser] = useState(false);

  return (
    <div>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <button onClick={() => setShowMenu(!showMenu)}>
            <Image src={hamburgerIcon} alt="menuIcon" />
          </button>
          {showMenu ? (
            <section>
              <ul className={styles.ul}>
                <li className={styles.li}>
                  <Link href="/" passHref>
                    Home
                  </Link>
                </li>
                <li className={styles.li}>
                  <Link href="/store?page=1">Store</Link>
                </li>
                <li className={styles.li}>
                  <Link href="/contact" passHref>
                    Contact
                  </Link>
                </li>
              </ul>
            </section>
          ) : null}
        </li>
        <li className={styles.li}>
          <Link href="/cart" passHref>
            <button>
              <Image src={cartIcon} alt="cartIcon" />
            </button>
          </Link>
        </li>
        <li className={styles.li}>
          <button onClick={() => setShowSearchInput(!showSearchInput)}>
            <Image src={searchIcon} alt="cartIcon" />
          </button>
          {showSearchInput ? <input type="text" /> : null}
        </li>

        <li className={styles.li}>
          <button onClick={() => setShowUser(!showUser)}>
            <Image src={userIcon} alt="cartIcon" />
          </button>
          {showUser ? <UserInfo /> : null}
        </li>
      </ul>
    </div>
  );
};

export default PhoneMenu;
