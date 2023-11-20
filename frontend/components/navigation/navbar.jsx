import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<a target={"_blank"}>
				<img
					className={styles.alchemy_logo}
					src="/logos/chainlink-logo.png"
					onClick={() => document.documentElement.requestFullscreen()}
				></img>
			</a>
            <ConnectButton style={{fontWeight:'200'}}></ConnectButton>
		</nav>
	);
}
