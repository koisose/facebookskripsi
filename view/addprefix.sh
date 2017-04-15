while read line
do
    echo "<a href='$line'>$line</a></br>" >> langsung.txt
done < langsung.ejs