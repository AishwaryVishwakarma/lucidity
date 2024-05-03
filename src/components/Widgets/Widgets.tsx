import React from 'react';
import styles from './styles.module.scss';

type WidgetsProps = {
  // The configuration for the widgets
  config: ({
    heading: string;
    value: number;
    icon: React.ReactNode;
  } | null)[];
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Renders a collection of widgets based on the provided configuration.
 */

const Widgets: React.FC<WidgetsProps> = (data) => {
  const { config, className, ...rest } = data ?? {};

  return (
    <div
      className={`${styles.widgetsContainer} ${className}`}
      data-widget-container='true'
      {...rest}
    >
      {/* Widgets */}
      {config.map((widget, index) => {
        if (!widget) return null;

        const { icon, heading, value } = widget ?? {};

        return (
          <div
            key={index}
            className={styles.widget}
            title={heading}
            data-widget='true'
          >
            <div className={styles.icon}>{icon}</div>
            <div className={styles.content}>
              <h3 className={styles.heading}>{heading}</h3>
              <p className={styles.value}>{value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Widgets;
