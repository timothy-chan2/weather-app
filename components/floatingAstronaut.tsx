import styles from '../styles/FloatingAstronaut.module.css';

const FloatingAstronaut = () => {
  return (
		<div className={styles.bkgd}>
			<div className={styles.window}>
				<div className={styles.stars}>
					<div className={styles.s1} />
					<div className={styles.s2} />
					<div className={styles.s3} />
					<div className={styles.s4} />
					<div className={styles.s5} />
					<div className={styles.s6} />
				</div>
				<div className={styles.astronaut}>
					<div className={styles.tank} />
					<div className={styles.person}>	
						<div className={styles.helmet}>
							<div className={styles.glass}>
								<div className={styles.reflection} />
							</div>
						</div>
						<div className={styles.suit}>
							<div className={styles.panel}>
								<div className={styles.btn1} />
								<div className={styles.btn2} />
								<div className={styles.knob} />
							</div>
						</div>
						<div className={styles.arml}>
							<div className={styles.forearml}>
								<div className={styles.glovel}>
									<div className={styles.thumbl} />
									<div className={styles.wrist2} />
								</div>
							</div>
						</div>
						<div className={styles.armr}>
							<div className={styles.forearmr}>
								<div className={styles.glover}>
									<div className={styles.thumbr} />
									<div className={styles.wrist1} />
								</div>
							</div>
						</div>
						<div className={styles.legl}>
							<div className={styles.stripel} />
							<div className={styles.bootl} />
						</div>
						<div className={styles.legr}>
							<div className={styles.striper} />
							<div className={styles.bootr} />
						</div>
					</div>
				</div>
			</div>
		</div>
  );
};

export default FloatingAstronaut;