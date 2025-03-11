package arkain.dev.portfolio.server.visitor.app.util;

import java.util.regex.Pattern;

public class IpConverter {
    private static final Pattern IP_PATTERN =
            Pattern.compile("^(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})$");

    public static Long ipToLong(String ip) {
        var matcher = IP_PATTERN.matcher(ip);
        if (!matcher.matches()) {
            throw new IllegalArgumentException("Invalid IP address format");
        }

        long result = 0;
        for (int i = 1; i <= 4; i++) {
            int octet = Integer.parseInt(matcher.group(i));
            if (octet < 0 || octet > 255) {
                throw new IllegalArgumentException("Invalid IP segment: " + octet);
            }
            result = (result << 8) + octet;
        }
        return result;
    }

    public static String longToIp(Long ip) {
        if (ip == null || ip < 0 || ip > 0xFFFFFFFFL) {
            throw new IllegalArgumentException("Invalid IP long value: " + ip);
        }

        return String.format("%d.%d.%d.%d",
                (ip >> 24) & 0xFF,
                (ip >> 16) & 0xFF,
                (ip >> 8)  & 0xFF,
                ip        & 0xFF
        );
    }
}
