
const CATEGORIES = [
  {
    name: "Windows",
    icon: "▣",
    blurb: "Fix common Windows issues and learn useful settings."
  },

  {
    name: "Linux",
    icon: "⌘",
    blurb: "Commands, troubleshooting and beginner-friendly Linux guides."
  },

  {
    name: "Networking",
    icon: "⌁",
    blurb: "Wi-Fi, DNS, IP and connectivity troubleshooting."
  },

  {
    name: "AI & Technology",
    icon: "✦",
    blurb: "Useful AI tools, tips and practical explainers."
  },

  {
    name: "IT Support",
    icon: "⚙",
    blurb: "Practical support workflows and troubleshooting."
  },

  {
    name: "Software & Tools",
    icon: "▤",
    blurb: "Guides to useful software and productivity tools."
  }
];
  {
    id: "network-troubleshooting",
    category: "Networking",
    title: "How to Troubleshoot a Network Connection: A Complete Beginner's Guide",
    excerpt:
      "A practical, step-by-step guide to diagnosing internet and network problems, including cables, Wi-Fi, IP addresses, DNS, ping, routing and common Windows network issues.",
    readTime: 12,
    level: "Beginner",
    body: [
      {
        h: "Introduction: Start With the Symptoms",
        p: "When a network connection stops working, the first instinct is often to restart everything or assume that the internet service provider is having an outage. Although restarting equipment can sometimes solve a problem, a better approach is to first understand exactly what is failing. Ask whether one computer is affected or whether every device on the network has the same problem. Determine whether the connection is completely unavailable, extremely slow, disconnecting periodically, or only failing when accessing certain websites. These details can immediately narrow down the possible causes. A problem affecting one laptop is very different from an outage affecting an entire office. Before changing settings, write down the symptoms, when the problem started, and whether anything changed recently."
      },

      {
        h: "1. Check the Physical Connection First",
        p: "Start with the simplest possible cause. If the affected device uses Ethernet, inspect the network cable and make sure both ends are firmly connected. Check the Ethernet port on the computer and the corresponding port on the router, switch, wall outlet, or docking station. If the port has activity lights, confirm that they are active. A damaged cable or loose connection can produce intermittent connectivity that looks like a complicated software problem. If possible, test with another known-good Ethernet cable. For Wi-Fi devices, confirm that Wi-Fi is enabled and that the device is connected to the correct wireless network. Also check whether airplane mode is enabled. Physical and connection-state checks should always come before advanced configuration changes."
      },

      {
        h: "2. Determine Whether One Device or the Entire Network Is Affected",
        p: "The next important test is to compare the affected device with another device using the same network. Try a phone, laptop, tablet, or another computer. If all devices are unable to access the internet, the problem may involve the router, modem, access point, gateway, switch, or internet service. If other devices work normally while only one computer has a problem, focus your troubleshooting on that computer. This distinction can save a significant amount of time. For example, changing DNS settings on one laptop will not fix an ISP outage affecting an entire building. Similarly, rebooting an entire network may be unnecessary if only one workstation has lost connectivity."
      },

      {
        h: "3. Check Whether the Network Adapter Is Working",
        p: "Your operating system must detect and enable the network adapter before normal connectivity can work. On Windows, open Device Manager and expand Network adapters. Look for warning symbols, disabled adapters, or devices that are missing completely. If the adapter is disabled, enable it and test the connection again. On Linux, you can use the command `ip link show` to view available interfaces and determine whether an interface is up. A missing adapter can indicate a driver problem, hardware issue, BIOS configuration problem, or physical connection issue. Avoid immediately downloading random driver-update utilities. If a driver needs to be installed, obtain it from the computer or network-adapter manufacturer's official support resources whenever possible."
      },

      {
        h: "4. Check Your IP Address and DHCP Configuration",
        p: "Once you know the adapter is working, check the device's IP configuration. On Windows, open Command Prompt and run `ipconfig`. For more detailed information, use `ipconfig /all`. On Linux, `ip addr` provides similar information. Look for an IPv4 address, subnet mask, default gateway, and DNS configuration. A Windows address beginning with 169.254.x.x usually indicates that the computer did not receive an address from the DHCP server. This can happen when the router is unavailable, DHCP is not responding, or the device has a configuration problem. If appropriate for your environment, you can try `ipconfig /release` followed by `ipconfig /renew` on Windows. On managed networks, however, do not randomly change static IP or DHCP settings because doing so can create additional conflicts."
      },

      {
        h: "5. Test the Default Gateway",
        p: "The default gateway is normally the router or network device that connects your local network to other networks. Testing it helps separate local network problems from internet problems. Find the gateway address using `ipconfig` on Windows or `ip route` on Linux. Then use the ping command. For example, if the gateway is 192.168.1.1, you can run `ping 192.168.1.1`. If the gateway does not respond, investigate the connection between the computer and the router. This could indicate a Wi-Fi problem, Ethernet problem, VLAN issue, adapter problem, or local firewall configuration. If the gateway responds normally but websites remain unreachable, the problem may be farther upstream."
      },

      {
        h: "6. Separate DNS Problems From Internet Problems",
        p: "DNS, or Domain Name System, translates names such as example.com into IP addresses. A DNS problem can make it appear as though the entire internet is unavailable even when basic connectivity is working. One useful test is to compare access to an IP address with access to a domain name. You can also use `nslookup example.com` on Windows to see whether the name resolves. If an IP address is reachable but domain names fail to resolve, investigate DNS rather than replacing cables or reinstalling network drivers. In managed business networks, do not automatically change DNS servers to public services because internal applications may depend on company DNS infrastructure. DNS should be changed only when you understand the environment and have permission to do so."
      },

      {
        h: "7. Use Ping Correctly",
        p: "Ping is one of the most useful basic networking tools, but it needs to be interpreted correctly. Start by pinging the local gateway. If that works, test an external IP address. Finally, test a domain name. This sequence helps identify where the failure occurs. For example, if the gateway responds but an external IP does not, the issue may be with the router's internet connection or upstream routing. If the external IP works but a domain does not, DNS becomes a stronger suspect. Keep in mind that some firewalls block ICMP traffic, so a failed ping does not automatically prove that the destination is offline."
      },

      {
        h: "8. Use Tracert to Investigate Routing",
        p: "If your local network appears healthy but an external destination cannot be reached, Windows provides the `tracert` command. For example, `tracert example.com` displays network hops between your computer and the destination. This can help identify where latency or routing problems begin. However, do not assume that every timeout shown in a traceroute means there is an outage. Routers and firewalls often ignore or rate-limit diagnostic traffic while continuing to forward normal traffic. Use traceroute as supporting evidence rather than treating it as a definitive diagnosis. Compare multiple destinations and, when possible, compare results from another network."
      },

      {
        h: "9. Troubleshoot Wi-Fi Separately",
        p: "If the problem occurs only over Wi-Fi, investigate wireless conditions. Move the device closer to the access point and test again. If performance improves significantly, signal strength, walls, distance, interference, or access-point placement may be involved. Other wireless networks, Bluetooth devices, thick walls, appliances, and crowded environments can affect wireless performance. Also consider whether the client device supports the wireless standard being used. A modern router cannot make an older laptop operate beyond the capabilities of its own wireless hardware. When troubleshooting Wi-Fi, compare performance at different locations and times rather than relying on a single speed test."
      },

      {
        h: "10. Compare Wired and Wireless Performance",
        p: "A wired Ethernet test is one of the most useful ways to isolate a Wi-Fi problem. If a computer achieves normal performance over Ethernet but is slow over Wi-Fi, the internet service itself may be functioning normally. The investigation should then focus on wireless signal quality, interference, channel congestion, access-point placement, client hardware, and wireless configuration. If both wired and wireless devices experience the same problem, investigate the router, modem, gateway, ISP connection, or upstream network. Record the results of both tests because they provide valuable evidence when escalating the problem to a network administrator or service provider."
      },

      {
        h: "11. Check for Background Network Usage",
        p: "A connection can appear slow even when there is no actual network failure. Cloud synchronization, operating-system updates, application downloads, video streaming, backups, and large file transfers can consume available bandwidth. On Windows, Task Manager can provide information about network activity. Routers may also provide traffic statistics or connected-device lists. If only one device becomes slow while another performs normally, check what applications are actively communicating. Business environments should also consider whether another user or device is consuming the available connection."
      },

      {
        h: "12. Common Network Troubleshooting Mistakes",
        p: "One of the most common mistakes is changing several settings at once. If you change DNS, reinstall the network adapter, restart the router, modify Wi-Fi channels, and reset TCP/IP simultaneously, you may never know which change actually fixed the problem. Another mistake is assuming that a slow internet connection automatically means the ISP is responsible. Local Wi-Fi congestion, background downloads, failing hardware, DNS problems, and overloaded devices can all create similar symptoms. Avoid using unknown network-optimization software that promises to repair everything automatically. Good troubleshooting is controlled, reversible, and based on evidence."
      },

      {
        h: "13. When Should You Escalate the Problem?",
        p: "Escalation is appropriate when basic troubleshooting has identified a problem outside your control or when the issue requires administrative access. For example, you may need to escalate when multiple users lose connectivity, the router repeatedly drops its WAN connection, an ISP circuit shows packet loss, a switch port appears faulty, or a managed network configuration needs to be changed. Before escalating, document the affected device or location, start time, symptoms, tests performed, IP information, ping results, traceroute results, and whether other devices are affected. A clear troubleshooting history allows the next technician to continue from where you stopped instead of repeating the same checks."
      },

      {
        h: "14. How to Prevent Future Network Problems",
        p: "Prevention begins with keeping network equipment maintained and documented. Keep router and access-point firmware reasonably current, maintain good cable quality, document important network settings, and monitor recurring connectivity problems. Business environments should maintain network diagrams, IP address documentation, equipment inventories, and escalation procedures. Home users should use strong administrator credentials and secure wireless encryption. If a particular device repeatedly loses connectivity, record the frequency and circumstances. Recurring failures often reveal patterns that are impossible to see from a single incident."
      },

      {
        h: "Conclusion",
        p: "Network troubleshooting becomes much easier when you work from the simplest layer toward the more complicated ones. Start with cables and Wi-Fi connection status, determine the scope of the problem, verify the network adapter, inspect IP configuration, test the gateway, investigate DNS, and then examine external routing. Avoid changing multiple variables simultaneously and always document your results. The goal is not simply to make the internet work again; it is to understand why the failure occurred so that the same problem can be solved faster next time."
      },

      {
        h: "Frequently Asked Questions",
        p: "Why does restarting the router sometimes fix the problem? A restart can clear temporary software states, renew connections, and restart network services. Why does Wi-Fi work near the router but not in another room? Distance, walls, interference, and signal attenuation are common causes. Why does ping sometimes fail even when websites work? Some devices block ICMP traffic, so a failed ping does not always mean the destination is offline. When should I contact my ISP? Contact the provider when multiple devices have the same external connectivity problem, especially after local equipment and wired tests have been checked."
      }
    ]
  },

  {
    id: "windows-boot-recovery",
    category: "Windows",
    title: "Windows Won't Boot? A Step-by-Step Recovery Checklist",
    excerpt:
      "A practical troubleshooting guide for black screens, boot loops, startup failures, corrupted system files, failed updates and Windows recovery problems.",
    readTime: 11,
    level: "Intermediate",
    body: [
      {
        h: "Introduction: Don't Reinstall Windows Yet",
        p: "A Windows computer that refuses to boot can look like a disaster, but many startup problems can be repaired without wiping the machine. A black screen, automatic repair loop, blue screen, boot error, or computer that repeatedly restarts can have many different causes. The most important rule is to avoid immediately reinstalling Windows or deleting partitions. First determine whether the computer reaches the manufacturer's logo, Windows logo, login screen, or recovery environment. That point in the startup process provides useful information about what is failing."
      },

      {
        h: "1. Identify Exactly What Happens During Startup",
        p: "Start by observing the startup sequence. Does the computer power on? Do fans and status lights activate? Does the manufacturer's logo appear? Does Windows begin loading before showing an error? Does the system restart continuously? Each symptom points toward a different category of problem. If there is no power at all, investigate power and hardware before Windows. If BIOS or UEFI appears but Windows does not load, investigate the storage device, boot configuration, operating system files, or recent updates. Taking a photograph of the error message can also be useful when researching or escalating the issue."
      },

      {
        h: "2. Disconnect Unnecessary External Devices",
        p: "USB drives, external hard drives, docking stations, printers, and other peripherals can occasionally interfere with startup. Disconnect unnecessary devices and leave only the keyboard, mouse, display, and required equipment connected. If Windows suddenly starts normally, reconnect devices one at a time to identify the cause. Do not disconnect internal storage or hardware unless you understand the system configuration. This simple test can prevent you from performing complicated recovery procedures when an external device was responsible for the startup behavior."
      },

      {
        h: "3. Enter Windows Recovery Environment",
        p: "Windows Recovery Environment provides tools for repairing startup problems. If Windows repeatedly fails during startup, the recovery environment may appear automatically. You can also access recovery options using appropriate installation or recovery media. Once inside, you may see options such as Startup Repair, System Restore, Uninstall Updates, Command Prompt, and Startup Settings. Avoid selecting destructive options until you understand what they will do. The goal is to use the least invasive repair that addresses the problem."
      },

      {
        h: "4. Try Startup Repair",
        p: "Startup Repair is a good first automated recovery option. It is designed to identify and repair common startup problems involving boot configuration and system startup files. Allow the process to complete and then restart the computer. If it reports that it could not repair the PC, do not assume that the system is beyond repair. The result simply means the automated tool could not resolve the particular cause. Continue with the next diagnostic step rather than repeatedly running the same repair."
      },

      {
        h: "5. Consider Recent Updates or Driver Changes",
        p: "If the computer worked normally until a recent Windows update, driver installation, or software installation, that timing is important. The recovery environment can provide options for uninstalling recent updates or using System Restore when restore points are available. This approach is often safer than performing random repairs because it reverses a known recent change. Document what changed before the failure occurred. A newly installed graphics driver, storage driver, security application, or Windows update can sometimes introduce startup problems."
      },

      {
        h: "6. Check System Files",
        p: "Corrupted Windows system files can prevent the operating system from starting correctly. Recovery environments may allow you to use tools such as System File Checker and DISM. Depending on the recovery environment and Windows installation, the correct drive letter may not be C:, so verify the Windows partition before running commands. Avoid copying commands from unknown websites without understanding what they do. System repair commands can be powerful, and incorrect offline paths can produce confusing results."
      },

      {
        h: "7. Check the Storage Device",
        p: "A failing SSD or hard drive can cause boot failures, freezes, blue screens, and corrupted files. Check whether the storage device is detected in BIOS or UEFI. If the drive disappears intermittently, that is a significant hardware warning. File-system errors can sometimes be repaired, but repeated errors or physical disk failures require a different strategy. If the data is important, prioritize backup or professional recovery before repeatedly stressing a potentially failing drive."
      },

      {
        h: "8. Understand Boot Configuration Problems",
        p: "Windows depends on boot configuration information to locate and start the operating system. Damage to boot configuration data can produce messages indicating that Windows cannot start or that a required boot device cannot be found. Recovery tools can sometimes rebuild or repair this configuration. However, boot configuration commands should be used carefully, particularly on computers with multiple operating systems or unusual disk layouts. If the machine is business-critical, document the current configuration before making advanced changes."
      },

      {
        h: "9. Try Safe Mode",
        p: "Safe Mode starts Windows with a limited set of drivers and services. If the system can boot successfully in Safe Mode but crashes during a normal startup, third-party drivers, services, or startup applications become stronger suspects. Remove or roll back recently installed drivers and applications where appropriate. Safe Mode is particularly useful when a graphics driver or security application is causing startup instability. Do not assume that Safe Mode itself has repaired the system; use it as a diagnostic environment to identify what differs from a normal boot."
      },

      {
        h: "10. When Hardware Failure Becomes More Likely",
        p: "If the storage device is not detected, the computer powers off unexpectedly, memory tests fail, or the machine continues to crash even after operating-system repairs, hardware becomes a stronger suspect. Check vendor diagnostics where available. For important systems, avoid repeatedly attempting repairs that could worsen data loss. If a drive is failing, replace it and restore from a reliable backup rather than continuing to operate on unstable hardware."
      },

      {
        h: "11. Avoid Common Recovery Mistakes",
        p: "The biggest mistake is treating every boot problem as a reason to reinstall Windows. Reinstallation can erase applications, settings, and potentially data. Another mistake is repeatedly forcing the computer off without considering whether storage corruption is occurring. Avoid registry cleaners and unverified repair programs. If the machine contains important business or personal data, protect that data before attempting aggressive recovery procedures."
      },

      {
        h: "12. When to Escalate",
        p: "Escalate the issue when the storage device is failing, important data is at risk, hardware diagnostics report errors, recovery tools repeatedly fail, or the machine is business-critical. Provide the exact error message, the point where startup stops, recent changes, recovery steps already attempted, and any diagnostic results. A good escalation prevents another technician from repeating the same troubleshooting steps."
      },

      {
        h: "Conclusion",
        p: "Windows startup problems should be approached methodically. Identify where startup stops, disconnect unnecessary devices, enter recovery mode, try Startup Repair, investigate recent changes, check system files, verify storage health, and use Safe Mode when appropriate. Reinstallation should be considered only after less destructive options have been exhausted and important data has been protected."
      },

      {
        h: "Frequently Asked Questions",
        p: "Will Startup Repair delete my files? It is designed as a repair tool rather than a normal data-wiping procedure, but backups are still recommended. Should I reinstall Windows immediately? No. Determine the cause first. What if the SSD is not detected in BIOS? That can indicate a hardware, connection, firmware, or storage failure and should be investigated before Windows repair. What if Windows boots in Safe Mode? Investigate recently installed drivers, services, and startup applications."
      }
    ]
  },

    {
    id: "linux-commands-beginners",
    category: "Linux",
    title: "10 Linux Commands Every IT Beginner Should Know",
    excerpt: "A practical beginner's guide to the Linux commands used for navigation, files, processes, storage, permissions and networking.",
    readTime: 12,
    level: "Beginner",
    body: [
      {
        h: "Introduction",
        p: "Linux can appear intimidating when you first encounter a terminal full of commands. In reality, you only need a relatively small collection of commands to perform a large percentage of everyday IT support and administration tasks. Learning commands is less about memorizing hundreds of options and more about understanding what information each command provides. This guide focuses on commands that help you navigate the file system, inspect files, find information, monitor resources, manage permissions, and troubleshoot basic network problems."
      },
      {
        h: "1. pwd — Find Your Current Location",
        p: "The `pwd` command means print working directory. It tells you exactly where you are in the Linux file system. This is especially useful when working with relative paths because the same filename can exist in multiple directories. Before modifying or deleting anything from the command line, using pwd is a simple way to confirm your current location."
      },
      {
        h: "2. ls — List Files and Directories",
        p: "The `ls` command displays the contents of a directory. A common variation is `ls -la`, which displays hidden files as well as detailed ownership, permissions, sizes, and timestamps. Understanding the output of ls is important because Linux relies heavily on file ownership and permissions."
      },
      {
        h: "3. cd — Move Between Directories",
        p: "The `cd` command changes your current directory. For example, `cd /var/log` moves into the system log directory. `cd ..` moves one level upward, while `cd ~` returns to your home directory. Combining cd with pwd and ls gives you a basic way to explore a Linux system safely."
      },
      {
        h: "4. cat and less — Read Files",
        p: "The `cat` command displays the contents of a file directly in the terminal. It is useful for short configuration files. For longer files, `less` is usually more practical because you can scroll through the content without printing the entire file at once. Logs are often much easier to inspect using less."
      },
      {
        h: "5. grep — Search for Information",
        p: "The `grep` command searches text for a pattern. For example, `grep error application.log` can locate lines containing the word error. Combining grep with other commands is one of the most powerful features of Linux troubleshooting because it allows you to reduce a large amount of output to the information that matters."
      },
      {
        h: "6. ps and top — Understand Running Processes",
        p: "The `ps aux` command provides a snapshot of running processes, while `top` provides continuously updated information. These commands help identify applications consuming CPU or memory. Before terminating a process, verify what it is and whether it is safe to stop. Killing system processes without understanding their purpose can cause instability."
      },
      {
        h: "7. df — Check Disk Space",
        p: "The `df -h` command shows available and used disk space in a readable format. This is one of the first commands to run when a Linux system behaves strangely because a full file system can cause applications, services, databases, and logging systems to fail."
      },
      {
        h: "8. free — Check Memory",
        p: "The `free -h` command displays memory and swap usage. High memory utilization is not automatically a problem because Linux intentionally uses available memory for caching. Look for overall memory pressure, swap behavior, and applications consuming unusually large amounts of RAM."
      },
      {
        h: "9. chmod and chown — Understand Permissions",
        p: "Linux permissions determine who can read, modify, or execute a file. `chmod` changes permission bits, while `chown` changes ownership. These commands are powerful and should be used carefully. Incorrect permissions can break applications or create security problems."
      },
      {
        h: "10. ip and ping — Basic Network Troubleshooting",
        p: "The `ip addr` command shows network interfaces and addresses, while `ping` tests basic reachability. Together they provide a useful starting point when a Linux machine cannot communicate with another system. For more advanced troubleshooting, commands such as ss, ip route, dig, and traceroute can provide additional information."
      },
      {
        h: "Common Beginner Mistakes",
        p: "A common mistake is using sudo for every command. Administrative privileges should be used only when required. Another mistake is copying commands from the internet without understanding them. Pay particular attention to commands involving rm, chmod, chown, disk devices, and recursive operations because a small mistake can cause significant damage."
      },
      {
        h: "Conclusion",
        p: "These commands form a strong foundation for Linux troubleshooting. Learn what each command does, understand its basic output, and practice in a safe environment. As your experience grows, you can combine commands using pipes, redirects, filters, and shell scripts to automate repetitive support tasks."
      },
      {
        h: "Frequently Asked Questions",
        p: "Do I need to memorize every Linux command? No. Understanding the common commands and knowing how to read their documentation is more valuable. Is sudo dangerous? It grants elevated privileges, so it should be used carefully. What command should I use when a server is full? Start with `df -h`, then investigate which directories or files are consuming space."
      }
    ]
  },

  {
  id: "dns-troubleshooting",
  category: "Networking",
  title: "DNS Troubleshooting: Why Websites Won't Load and How to Fix It",
  excerpt: "Understand DNS, identify name-resolution problems, and troubleshoot common DNS issues step by step.",
  readTime: 10,
  level: "Beginner"
},

{
  id: "wifi-slow",
  category: "Networking",
  title: "Why Is My Wi-Fi So Slow? A Complete Troubleshooting Guide",
  excerpt: "Learn how to diagnose slow Wi-Fi caused by signal strength, interference, congestion, hardware and configuration.",
  readTime: 11,
  level: "Beginn{
  id: "ai-tools-it-support",
  category: "AI & Technology",
  title: "How AI Tools Can Help IT Support Technicians Work Faster",
  excerpt: "Practical ways AI can help with troubleshooting, documentation, scripts, ticket summaries and technical research.",
  readTime: 10,
  level: "Beginner"
},

{
  id: "prompt-engineering-beginners",
  category: "AI & Technology",
  title: "Prompt Engineering for Beginners: How to Get Better Results From AI",
  excerpt: "Learn how to write clear prompts, provide context, request structured answers and verify AI-generated information.",
  readTime: 9,
  level: "Beginner"
},

{
  id: "ai-cybersecurity",
  category: "AI & Technology",
  title: "AI and Cybersecurity: How Artificial Intelligence Is Changing IT Security",
  excerpt: "Explore how AI is being used for threat detection, security operations, automation and defensive analysis.",
  readTime: 11,
  level: "Intermediate"
}



},

{
  id: "ip-address-guide",
  category: "Networking",
  title: "IP Addresses Explained: IPv4, IPv6, DHCP, DNS and Gateways",
  excerpt: "A beginner-friendly explanation of the network settings every IT support technician should understand.",
  readTime: 12,
  level: "Beginner"
}

  
